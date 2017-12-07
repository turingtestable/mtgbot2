const fetch = require("node-fetch")
const stringify = require('json-stringify')

const makeChannelSender = channel => message => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + process.env.OAUTH_TOKEN
  }

  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: headers,
    body: stringify({
      channel: channel,
      text: message
    })
  }).then(response => response.json())
    .then(json => { console.log(json) })
    .catch(ex => {
      console.log('Err: ' + ex)
    })
}

const helpers = {
  makeChannelSender: makeChannelSender,
  card_pattern: new RegExp('^![0-9a-zA-Z]+'),
  rule_pattern: new RegExp('^![0-9]{3}(\.[0-9]{2}){0,1}$'),
  // TODO: Handle !define <trample etc.>, likely before the card pattern
  rule_lookup: function(text, channel) {
    makeChannelSender(channel)("Rules lookup not implemented yet, sorry friends")
  }
}

module.exports = helpers