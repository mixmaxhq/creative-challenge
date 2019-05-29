package main

import (
	"flag"
	"fmt"
	"image"
	"image/color/palette"
	"image/draw"
	"image/gif"
	"os"
	"path"

	"github.com/anthonynsimon/bild/imgio"
	"github.com/anthonynsimon/bild/transform"
	"github.com/cheggaaa/pb"
)

var (
	gifDelay    = flag.Int("delay", 4, "Delay between gif frames")
	toWatermark = flag.String("file", "", "Image to watermark")
	outGifLoc   = flag.String("out", "out.gif", "Filename for output gif")
)

func main() {
	flag.Parse()

	// Assert we have what we need in order to function.
	if len(*toWatermark) == 0 {
		fmt.Println("must provide both -file")
		os.Exit(1)
	} else if *gifDelay < 1 {
		fmt.Println("must provide a gif delay greater than 0")
		os.Exit(1)
	} else if len(*outGifLoc) == 0 {
		fmt.Println("cannot provide an empty output location")
		os.Exit(1)
	}

	cwd, err := os.Getwd()
	if err != nil {
		fmt.Println("failed to identify working directory, aborting")
		os.Exit(1)
	}

	// Open the watermark image so that we can resize it.
	img, err := imgio.Open(path.Join(cwd, "mxmx-logo.jpeg"))
	if err != nil {
		panic(err)
	}
	size := img.Bounds()

	// Load the image to watermark so that we can use it to
	// identify the appropriate watermark size.
	wmImg, err := imgio.Open(*toWatermark)
	if err != nil {
		fmt.Println("failed to open image to watermark, err: ", err)
		os.Exit(1)
	}
	origBounds := wmImg.Bounds()

	// Base WM image size to start with. Will it be too big on images
	// smaller than 500x500? Yes. Do we care? Not really, moar Mixmax
	// moar betterer.
	desiredBounds := 100

	// We use a naive rule of trying to make the watermark be a
	// twenty-fifth of the overall image size.
	if origBounds.Max.X > size.Max.X*5 ||
		origBounds.Max.Y > size.Max.Y*5 {

		// Cheaply identify the smallest dimension of the image,
		// the stdlib `math` package only likes floats 😭.
		smallerDimension := origBounds.Max.X
		if origBounds.Max.Y < smallerDimension {
			smallerDimension = origBounds.Max.Y
		}

		desiredBounds = smallerDimension / 5
	}

	img = transform.Resize(
		img,
		desiredBounds,
		desiredBounds,
		transform.Linear,
	)

	// Pre-create the rotated watermark images to simplify processing
	// later.
	var images = make([]image.Image, 32)
	for i := 0; i < 32; i++ {
		images[i] = transform.Rotate(img, -11.25*float64(i), nil)
	}

	if err := combineInfoGif(
		images,
		*toWatermark,
		desiredBounds,
	); err != nil {
		panic(err)
	}
}

// combineIntoGif creates a gif with a rotating Mixmax logo watermark.
func combineInfoGif(images []image.Image, toWM string, dimension int) error {

	// Load the image to WM
	img, err := imgio.Open(toWM)
	if err != nil {
		return err
	}
	origBounds := img.Bounds()

	// Let's identify our starting point for embedding the watermark.
	wmStartPoint := image.Point{
		X: (-1 * origBounds.Max.X) + dimension + 10,
		Y: (-1 * origBounds.Max.Y) + dimension + 10,
	}

	betterPalette := palette.Plan9
	bar := pb.StartNew(len(images))

	outGif := &gif.GIF{}
	for _, i := range images {
		newCopy := image.NewPaletted(origBounds, betterPalette)

		// Cheaply copy the image into the new buffer.
		draw.Draw(
			newCopy,
			newCopy.Rect,
			img,
			origBounds.Min,
			draw.Src,
		)

		// Draw the WM on the image
		draw.Draw(
			newCopy,
			newCopy.Bounds(),
			i,
			wmStartPoint,
			draw.Over,
		)

		outGif.Image = append(
			outGif.Image,
			newCopy,
		)
		outGif.Delay = append(outGif.Delay, *gifDelay)
		bar.Increment()
	}
	bar.Finish()

	f, err := os.OpenFile(*outGifLoc, os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		return err
	}
	defer f.Close()
	return gif.EncodeAll(f, outGif)
}
