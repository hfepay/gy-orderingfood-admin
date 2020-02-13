import TradeApi from './TradeApi'
class TradeBusinessApi extends TradeApi {
  constructor() {
    super('business')
  }
}

export default new TradeBusinessApi()
