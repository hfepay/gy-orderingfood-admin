// 菜单
import TradeApi from './TradeApi'
class TradeFoodMenuApi extends TradeApi {
  constructor() {
    super('foodMenu')
  }
}

export default new TradeFoodMenuApi()
