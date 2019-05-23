(function M() {
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = 'https://github.com/mixmaxhq/creative-challenge/blob/master/assets/2019-05-mixmax-logo/mixmax.png?raw=true';
  image.onload = () => {
    document.body.innerHTML = '';
    [].slice.call(document.getElementsByTagName('style')).forEach((style) => style.remove());
    document.querySelectorAll('link[rel=stylesheet]').forEach((style) => style.remove());

    const text = '(' + M.toString().replace(/\s{2,}|\n/g, ' ') + ')();';

    const style = document.createElement('style');
    style.innerHTML = 'body { background: #ddd; }'
      + ' div { margin: 0 auto; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); }'
      + ' span { font: bold 12pt monospace; }'
      + ' i { font-style: normal; }';
    document.body.appendChild(style);

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    document.body.appendChild(canvas);

    const logo = document.createElement('div');
    document.body.appendChild(logo);

    const ratioSpan = document.createElement('span');
    ratioSpan.innerText = 'M';
    logo.appendChild(ratioSpan);
    const ratio = ratioSpan.getBoundingClientRect().height / ratioSpan.getBoundingClientRect().width;
    ratioSpan.remove();

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const pixelsPerCharacter = Math.ceil(((canvas.width * canvas.height) / text.length)),
          xSize = Math.sqrt(pixelsPerCharacter / ratio),
          ySize = pixelsPerCharacter / xSize,
          imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const getColor = (x, y) => {
      x = Math.round(x);
      y = Math.round(y);
      const index = (y * (imageData.width * 4) + (x * 4)),
        red = imageData.data[index],
        green = imageData.data[index + 1],
        blue = imageData.data[index + 2],
        alpha = imageData.data[index + 3];
      return (alpha === 0 ? false : `rgb(${red}, ${green}, ${blue})`);
    };

    let x, y, row, color, char, j = 0, i;
    for (y = 0; y < canvas.height - 1; y += ySize) {
      row = document.createElement('span');
      row.style.display = 'block';
      for (x = 0; x < canvas.width - 1; x += xSize) {
        color = getColor(x, y);
        char = text[j++] || '/';
        i = document.createElement('i');
        if (color) i.style.background = '#fff';
        if (!color) color = '#bbb';
        i.style.color = color;
        i.innerText = char;
        row.appendChild(i);
      }
      logo.appendChild(row);
    }

    canvas.remove();
  };
})();
