const sharp = require('sharp')

module.exports = async (imgArray) => {
  return new Promise(async(rs,rj) => {
    const response = []
    for await ( const imgItem of imgArray ) {
      try {
        const name = imgItem.name.match(/(.*)\./)[1]
        // console.log({name})
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

            let sharpObject

            if ( metadata && metadata.width > 1200 ) {
              sharpObject = sharp(path).resize(1200)
            } else {
              sharpObject = sharp(path)
            }
            sharpObject
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
            // } else { response.push(responseObject); rs() }
          }).catch(e => {
            // console.log(e, e.message)
            response.push({error: 'ERROR with image', path: imgItem ? imgItem.path : 'none', errorDetails: e.message})
            rs()
          })
        })
      } catch(e) {
        response.push({error: 'ERROR with image', name: imgItem ? imgItem.name : 'none'})
        // rs()
      }
    }
    console.log('resolved')
    rs(response)
  })
}
