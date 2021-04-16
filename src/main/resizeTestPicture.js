const sharp = require('sharp')

module.exports = () => {
  sharp('./testPicData/46dae512e375bee2664a025507da8795.jpg')
  .metadata()
  .then((metadata) => {
    // console.log({metadata})
    if ( metadata && metadata.width > 1200 ) {
      return sharp('./testPicData/46dae512e375bee2664a025507da8795.jpg')
        .resize(1200)
        .png()
        .toFile('./processedPictures/textpic.png', (err, info) => { 
          console.log({err})
          console.log({info})
         })
    }
  })
}
