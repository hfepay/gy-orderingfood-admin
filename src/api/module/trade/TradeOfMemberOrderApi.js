import TradeApi from './TradeApi'

class TradeOfMemberOrderApi extends TradeApi {
  constructor() {
    super('ofMemberOrder')
  }

  updateOrderStatus(...ids) {
    return super.customize_put('/updateOrderStatus', { ids, orderStatus: 3 })
  }
}

export default new TradeOfMemberOrderApi()
