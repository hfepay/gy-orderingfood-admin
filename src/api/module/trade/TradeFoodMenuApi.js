// 菜单
import TradeApi from './TradeApi'
class TradeFoodMenuApi extends TradeApi {
  constructor() {
    super('foodMenu')
  }
  setStatus(id, status) {
    super.customize_put(`/status/${id}/${status}`)
  }
}

export default new TradeFoodMenuApi()
