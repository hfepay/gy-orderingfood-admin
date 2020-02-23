// 菜品
import TradeApi from './TradeApi'

class TradeFoodApi extends TradeApi {
  constructor() {
    super('food')
  }

  get(data) {
    return super.customize_get(`/detail`, data)
  }
  del(id) {
    return super.customize_del(`/del/${id}`)
  }

  usable(data) {
    return super.customize_post_formdata('/usable', data)
  }

  async getOptions() {
    const res = await super.page({ page: 1, limit: 999, total: 0 })
    const list = res.data && res.data.records
    if (list && list.length > 0) {
      return list.map(item => ({
        label: item.foodName,
        value: item.id,
        foodTypeCn: item.foodTypeCn || '',
        foodTypeId: item.foodTypeId || '',
        foodImg: item.foodImg || '',
        foodImgSmall: item.foodImgSmall || ''
      }))
    } else {
      return []
    }
  }
}

export default new TradeFoodApi()
