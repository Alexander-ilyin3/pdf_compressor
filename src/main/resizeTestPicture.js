const sharp = require('sharp')

module.exports = () => {
  sharp('C:/Users/Qitpess/AppData/Roaming/npm-cache/_logs/2021-04-15T14_52_18_530Z-debug.log/37f86eee-5fef-4b80-a6e0-780ba420bdca.__CR0,0,1464,600_PT0_SX1464_V1___.jfif')
  .toBuffer()
  .then(isPicture => {
    conssole.log({isPicture})
    // 100 pixels wide, auto-scaled height
  });
}
