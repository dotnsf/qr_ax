//.  app.js
var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    app = express();

var QRCode = require( 'qrcode' );
var uuidv1 = require( 'uuid/v1' );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.static( __dirname + '/public' ) );

app.post( '/qrcode', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var data = JSON.parse( '[' + req.body.data + ']' );

  if( data ){
    var filepath = './tmp/' + uuidv1() + '.png';
    //. https://www.npmjs.com/package/qrcode
    QRCode.toFile( 
      filepath,
      [ { data: data, mode: 'byte' } ],
      function( err, result ){
        if( err ){
          console.log( err );
          fs.unlink( filepath, function( err ){} );
        }else{
          var bin = fs.readFileSync( filepath );
          fs.unlink( filepath, function( err ){} );
          res.contentType( 'image/png' );
          res.header( { 'Content-Disposition': 'inline' } );
          res.end( bin, 'binary' );
        }
      }
    );
  }else{
    var p = JSON.stringify( { status: false, error: 'no image data.' }, null, 2 );
    res.status( 400 );
    res.write( p );
    res.end();
  }
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
