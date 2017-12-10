const fetch = require('node-fetch')
const QueryString = require('querystring')
const urls = require('./urls')

const lookupPackOfCardsBySet = set => {
  const targetUrl = urls.boosterSearchBySet(set)
  console.log('Making mtgapi request for set', set)
  console.log('Target url', targetUrl)

  return fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
      const cards = data.cards
      return cards
    })
}

const lookupCardByMessage = text => {
  const queryParams = {
    pageSize: 2,
    name: text.slice(1),
    layout: 'normal|split|flip|double-faced|leveler|aftermath'
  }

  const params = QueryString.stringify(queryParams)
  const targetUrl = urls.cardSearch + params
  console.log('Making mtgapi request with params', params)
  console.log(targetUrl)

  return fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
      var firstCard = data.cards[0]
      const cards = [firstCard]

      if (firstCard.layout === 'double-faced') {
        if (!firstCard.number.endsWith('a') && !firstCard.number.endsWith('b')) {
          firstCard = data.cards[1]
        }
        const otherCardNumber = firstCard.number.endsWith('a')
          ? firstCard.number.replace('a', 'b')
          : firstCard.number.replace('b', 'a')


        return cardLookupBySetNumber({ set: firstCard.set, number: otherCardNumber })
          .then(nextCard => { cards.push(nextCard) })
          .then(() => cards)
      }

      return cards
    })
}

const cardLookupBySetNumber = options => {
  const set = options.set
  const number = options.number

  const queryParams = {
    pageSize: 1,
    set: set,
    number: number,
    layout: 'normal|split|flip|double-faced|leveler|aftermath'
  }

  const params = QueryString.stringify(queryParams)
  const targetUrl = urls.cardSearch + params
  console.log('Making mtgapi request with params', params)
  console.log('Target url', targetUrl)

  return fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data.cards[0]
    })
}

module.exports = {
  cardLookupBySetNumber,
  lookupCardByMessage,
  lookupPackOfCardsBySet
}