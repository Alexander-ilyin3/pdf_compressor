const initialLoad = require('./initialLoad.js')
const createFolder = require('./createFolder.js')
const compressAll = require('./compressAll.js')
import { app } from 'electron';

function setUpHandlers(ipcMain) {

  createFolder()

  ipcMain.handle('initialLoad', async (event, ...args) => {
    // resizeTestPicture()
    return await initialLoad()
  })
  ipcMain.handle('compressAll', async (event, args) => {
    console.log({args})
    // resizeTestPicture()
    return compressAll(args)
  })
  ipcMain.handle('getAppVersion', () => {
    return app.getVersion()
  })
}

module.exports = setUpHandlers
