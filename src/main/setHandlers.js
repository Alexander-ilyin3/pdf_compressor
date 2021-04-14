const initialLoad = require('./initialLoad.js')

function setUpHandlers(ipcMain) {

  ipcMain.handle('initialLoad', async (event, ...args) => {
    return await initialLoad()
  })
}

module.exports = setUpHandlers
