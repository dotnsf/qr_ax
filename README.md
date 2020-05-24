# qr_ax (QRcode generator for Animal CROSSing)

## Overview

JavaScript library for QRcode generator for Animal CROSSing.


## How to use

0. Code &lt;canvas&gt; element and &lt;img&gt; with **id**s :

- `<canvas id="canvas_id" width="32" height="32" style="display:none;"></canvas>`

  - Size has to be 32x32 (for Animal Crossing my design)
  - Only used for internal process. So this doesn't has to be displayed.

- `<img id="img_id"/>`

  - Result QR code image would be displayed as image.


1. Run following JavaScript sample with options : 

```
<script src="/qr_ax.js"></script>

  :
  :

$(function(){
  var img = new Image();
  img.src = 'https://xxx.com/abc.png';  //. image URL which you want to export as QR code.
  img.onload = () => {
    var canvas = document.getElementById( 'canvas_id' );
    if( !canvas || !canvas.getContext ){
      return false;
    }
    var ctx = canvas.getContext( '2d' );
    ctx.drawImage( img, 0, 0, canvas.width, canvas.height );
  };
});

  :
  :

var data = qrCode( 'canvas_id', 'Title', 'Author', 'Town' );
if( data && data.length == 620 ){
  data2qrcode( data, '/qrcode', 'img_id' );
}
```


## Licensing

This code is licensed under MIT.


## Copyright

2020 K.Kimura @ Juge.Me all rights reserved.

