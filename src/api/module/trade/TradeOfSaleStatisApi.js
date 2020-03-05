import TradeApi from './TradeApi'
class TradeOfSaleStatisApi extends TradeApi {
  constructor() {
    super('ofSaleStatis')
  }
  pageDays(data) {
    return super.customize_get('/pageDays', data)
  }
}

export default new TradeOfSaleStatisApi()
