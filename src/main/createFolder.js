const fs = require('fs')

module.exports = () => {
  try {
    if ( fs.readdirSync('./').filter((item) => { return item === 'PROCESSED_PICTURES' }).length ) {
      return
    }

    fs.mkdirSync('PROCESSED_PICTURES')

  } catch(e) {
    console.log(e)
  }
}
