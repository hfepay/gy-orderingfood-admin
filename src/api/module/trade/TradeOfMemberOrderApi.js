import TradeApi from './TradeApi'

class TradeOfMemberOrderApi extends TradeApi {
  constructor() {
    super('ofMemberOrder')
  }

  updateOrderStatus(...ids) {
    return super.customize_put('/updateOrderStatus', { ids, orderStatus: 3 })
  }

  subtotalOrder(data) {
    return super.customize_get(`/subtotalOrder`, data)
  }
  subtotalSale(data) {
    return super.customize_put(`/subtotalSale`, data)
  }
  export(data) {
    return super.customize_put(`/subtotalSale/export`, data, { responseType: 'blob' })
  }
}

export default new TradeOfMemberOrderApi()
