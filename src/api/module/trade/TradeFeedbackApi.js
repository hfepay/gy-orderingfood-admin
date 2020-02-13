import TradeApi from './TradeApi'
class TradeFeedbackApi extends TradeApi {
  constructor() {
    super('feedback')
  }
}

export default new TradeFeedbackApi()
