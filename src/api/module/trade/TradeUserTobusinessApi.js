import TradeApi from './TradeApi'
class TradeUserToBusinessApi extends TradeApi {
  constructor() {
    super('userToBusiness')
  }
}

export default new TradeUserToBusinessApi()
