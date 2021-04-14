function setUpHandlers(ipcMain) {

  ipcMain.handle('perform-action', (event, ...args) => {
    console.log(1)
  })
}

module.exports = setUpHandlers
