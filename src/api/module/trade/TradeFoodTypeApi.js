// 菜品类型
import TradeApi from './TradeApi'

class TradeFoodTypeApi extends TradeApi {
  constructor() {
    super('foodType')
  }

  async getOptions() {
    const res = await super.page({ page: 1, limit: 999, total: 0 }) // todo 输出list
    const list = res.data && res.data.records
    if (list && list.length > 0) {
      return list.map(item => ({ label: item.foodTypeCn, value: item.id }))
    } else return []
  }
}

export default new TradeFoodTypeApi()
