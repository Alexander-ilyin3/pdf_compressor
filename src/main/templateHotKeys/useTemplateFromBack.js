const clipboardy = require('clipboardy')
let lastUsedTemplateId, lastCLipboardContent

module.exports = async (templateObj) => {
  const commonSplice = (clipboardText, idx, rem, str) => {
    return clipboardText.slice(0, idx) + str + clipboardText.slice(idx + Math.abs(rem))
  }

  if ( !templateObj ) return

  const text = templateObj.simpleText
  const index = templateObj.insertMarkIndex
  let clipboardText = ''
  console.log('clipboard text', clipboardText)

  clipboardText = clipboardy.readSync()

  if ( clipboardText === '' ) return

  const newText = commonSplice(text, index, 0, clipboardText)

  if ( templateObj.id === lastUsedTemplateId && clipboardText === lastCLipboardContent ) return

  lastUsedTemplateId = templateObj.id
  lastCLipboardContent = newText
  clipboardy.writeSync(newText)
}