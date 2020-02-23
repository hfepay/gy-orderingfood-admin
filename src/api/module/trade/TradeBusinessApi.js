import TradeApi from './TradeApi'
class TradeBusinessApi extends TradeApi {
  constructor() {
    super('business')
  }
  conf(data) {
    return super.customize_put(`/conf`, data)
  }
  getConf(id) {
    return super.customize_get(`/conf/${id}`)
  }
}

export default new TradeBusinessApi()
