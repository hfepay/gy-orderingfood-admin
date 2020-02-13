// 菜品
import TradeApi from './TradeApi'
class TradeFoodApi extends TradeApi {
  constructor() {
    super('food')
  }
}

export default new TradeFoodApi()
