const baseMtgApi = 'https://api.magicthegathering.io/v1'
const cardSearch = baseMtgApi + '/cards?'
const setSearch = baseMtgApi + '/sets/'
const boosterSearchBySet = set => setSearch + set + '/booster'

module.exports = {
  mtgApi: baseMtgApi,
  cardSearch,
  setSearch,
  boosterSearchBySet
}