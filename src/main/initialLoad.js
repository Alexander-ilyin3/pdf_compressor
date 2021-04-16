module.exports = async () => {
  return new Promise((rs,rj) => {
    setTimeout(()=> {
      rs(['one from back', 2244, 'fsdfasdf', 44444, 'lololo'])
    }, 100)
  }) 
}
