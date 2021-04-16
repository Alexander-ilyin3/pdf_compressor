const sharp = require('sharp')

module.exports = async (imgArray) => {
  return new Promise(async(rs,rj) => {
    const response = []
    for await ( const imgItem of imgArray ) {
      const name = imgItem.name.match(/(.*)\./)[1]
      console.log({name})
      const { path } = imgItem
      await new Promise((rs,rj) => {
        sharp(path)
        .metadata()
        .then((metadata) => {
          // console.log({metadata})
          const responseObject = {
            oldWidth: metadata.width,
            oldHeight: metadata.height
          }



          if ( metadata && metadata.width > 1200 ) {

             sharp(path)
              .resize(1200)
              // .toFormat('png')
              .toFormat('jpg')
              .toFile('./processedPictures/' + name + '.jpg', (err, picinfo) => {
                // console.log({err})
                console.log('processing PIC')
                // console.log({picinfo})
                if ( picinfo ) {
                  response.push({...responseObject, ...picinfo})
                }
                rs()
              })
          } else { response.push(responseObject); rs() }
        })
      })
    }
    // imgArray.forEach(imgObj => {
    //
    // })
    console.log('RETURN')
    rs(response)
  })
}
