const fs = require('fs')

module.exports = () => {
  try {
    nedbFolder()
    processedPicturesFolder()

    function processedPicturesFolder() {
      if ( fs.readdirSync('./').filter((item) => { return item === 'PROCESSED_PICTURES' }).length ) {
        return
      }
      fs.mkdirSync('PROCESSED_PICTURES')
    }

    function nedbFolder() {
      if ( fs.readdirSync('./').filter((item) => { return item === 'NEDB' }).length ) {
        return
      }
      fs.mkdirSync('NEDB')
    }
  } catch(e) {
    console.log(e)
  }
}
