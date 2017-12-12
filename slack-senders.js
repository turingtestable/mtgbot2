const helpers = require('./helpers.js')
const lookupPackOfCardsBySet = require('./card-lookups').lookupPackOfCardsBySet
const renderListOfCards = require('./renderers').renderListOfCards

const sendDraftToEachPlayer = draftPlayerList => {
  console.log('players: ' + draftPlayerList)
  draftPlayerList.forEach(function (player) {
    player = strip(player)
    const set = 'SCG'
    // const DMSender
    const renderedListOfCards = lookupPackOfCardsBySet(set)
      .then(renderListOfCards)
    Promise.all([renderedListOfCards, helpers.getUserList()])
      .then(values => {
        console.log('Cards rendered and member list fetched')
        const DMChannel = helpers.makeDMSender(values, player)
          .then(json => { console.log(json) })
      })
  })
}

const getIdByName = (memberList, name) => {
  const result = memberList.filter(function (o) { return o['name'] == name; })['id']
  return result
}

const strip = (str) => {
  return str.replace(/^\s+|\s+$/g, '');
}

module.exports = {
  sendDraftToEachPlayer
}
