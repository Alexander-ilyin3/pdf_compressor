const nedb = require('nedb')
const db = new nedb({ filename: '../NEDB/templates.db', autoload: true })

module.exports = {
  db
}
