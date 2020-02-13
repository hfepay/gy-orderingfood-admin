// 菜品类型
import TradeApi from './TradeApi'
class TradeFoodTypeApi extends TradeApi {
  constructor() {
    super('foodType')
  }
}

export default new TradeFoodTypeApi()
