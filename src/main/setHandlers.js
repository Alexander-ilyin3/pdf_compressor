const initialLoad = require('./initialLoad.js')
// const resizeTestPicture = require('./resizeTestPicture.js')
const compressAll = require('./compressAll.js')

function setUpHandlers(ipcMain) {

  ipcMain.handle('initialLoad', async (event, ...args) => {
    // resizeTestPicture()
    return await initialLoad()
  })
  ipcMain.handle('compressAll', async (event, args) => {
    console.log({args})
    // resizeTestPicture()
    return compressAll(args)
  })
}

module.exports = setUpHandlers
