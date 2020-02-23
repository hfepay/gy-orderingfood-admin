import TradeApi from './TradeApi'
class TradeBusinessApi extends TradeApi {
  constructor() {
    super('business')
  }
  conf(data) {
    super.customize_put(`/conf`, data)
  }
  getConf(id) {
    super.customize_get(`/conf/${id}`)
  }
}

export default new TradeBusinessApi()
