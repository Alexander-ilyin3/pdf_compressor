const { globalShortcut } = require("electron")
const useTemplateFromBack = require('./useTemplateFromBack.js')
const { db } = require('../nedbControls/nedbExport.js')

module.exports = () => {

  const buttons = [ "num0", "num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9" ]

  try {
    buttons.forEach(button => {
      globalShortcut.register( button, () => {
        const strokeNumber = button.match(/num(.)/, 'g')[1]
  
        db.findOne({ datatype: 'templates'} , function (err, docs) {
          // console.log('docs', docs)
          if ( err ) { console.log(err); return }
          if ( !docs ) return
          const neededTemplate = docs?.data?.templates?.find(template => {
            return template.hotkey && template.hotkey === strokeNumber
          })
          if ( !neededTemplate ) return
          useTemplateFromBack(neededTemplate)
        })
  
        console.log(button, 'one pressed')
  
      })
    })
  } catch(e) {  }
}
