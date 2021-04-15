const initialLoad = require('./initialLoad.js')
const resizeTestPicture = require('./resizeTestPicture.js')

function setUpHandlers(ipcMain) {

  ipcMain.handle('initialLoad', async (event, ...args) => {
    resizeTestPicture()
    return await initialLoad()
  })
}

module.exports = setUpHandlers
