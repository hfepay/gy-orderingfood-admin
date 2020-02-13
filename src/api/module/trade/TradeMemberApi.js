import TradeApi from './TradeApi'
class TradeMemberApi extends TradeApi {
  constructor() {
    super('member')
  }
  frozen(id, status) {
    return super.customize_get(`/frozen/${id}/${status}`)
  }
}

export default new TradeMemberApi()
