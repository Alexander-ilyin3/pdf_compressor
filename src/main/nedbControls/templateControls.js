const { db } = require('./nedbExport.js')

module.exports = async (param, state) => {
return new Promise((rs,rj) => {

  if ( param === 'load' ) {
    db.findOne({ datatype: 'templates' }, function (err, docs) {
      if ( err || !docs || !docs['data']) return rs( [] )
      rs( docs['data'] )
    })
  } else if ( param === 'set' ) {
    db.update({ datatype: 'templates' }, { datatype: 'templates', data: state }, { upsert: true }, function (err, numReplaced, upsert) {
      rs()
      db.loadDatabase()
      // console.log('db should update')
    })
  }
})

}
