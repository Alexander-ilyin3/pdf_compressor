const createFolder = require('./createFolder.js')
const compressAll = require('./compressAll.js')
const { app } = require('electron')
const templateControls = require('./nedbControls/templateControls.js')
const registerGlobalKeys = require('./templateHotKeys/registerGlobalKeys.js')

function setUpHandlers(ipcMain) {

  registerGlobalKeys()
  createFolder()

  ipcMain.handle('templateControls', async (event, args) => {
    // console.log(args[0])
    // resizeTestPicture()
    return await templateControls(args[0], args[1])
  })
  ipcMain.handle('compressAll', async (event, args) => {
    // console.log({args})
    // resizeTestPicture()
    return compressAll(args)
  })
  ipcMain.handle('getAppVersion', () => {
    return app.getVersion()
  })
}

module.exports = setUpHandlers
