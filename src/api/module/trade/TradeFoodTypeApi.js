// 菜品类型
import TradeApi from './TradeApi'
class TradeFoodTypeApi extends TradeApi {
  constructor() {
    super('foodType')
  }
  async getFoodTypeOptions() {
    const res = await super.page({ page: 1, limit: 999, total: 0 }) // todo 输出list
  }
}

export default new TradeFoodTypeApi()
