import TradeApi from './TradeApi'
class TradeMemberDiscountApi extends TradeApi {
  constructor() {
    super('memberDiscount')
  }
}

export default new TradeMemberDiscountApi()
