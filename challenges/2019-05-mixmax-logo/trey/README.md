mxmx-watermark
=====

`mxmx-watermark` adds a rotating image as a watermark on the bottom right-hand
corner of an image.

Examples
=====
![Example output](./assets/example.gif)

How to use
=====

Use one of the provided prebuilt binaries. If on macOS, you can do:

```sh
./mxmx-watermark -file $yourFileHere
```

If you're on linux, you can use:

```sh
./mxmx-watermark-linux -file $yourFileHere
```

After the command is finished running, the watermarked image will be output as out.gif.

Notes
=====

Please don't consider this good Go code, this was me trying to get a social
code challenge submission together as quickly as possible. If you want to
play with you code, you can `go get` the code (use gopherflakes).
