import TradeApi from './TradeApi'
class TradeOrderEarlyApi extends TradeApi {
  constructor() {
    super('orderEarly')
  }
}

export default new TradeOrderEarlyApi()
