import TradeApi from './TradeApi'
class TradeOfSaleStatisApi extends TradeApi {
  constructor() {
    super('ofSaleStatis')
  }
  pageDays(data) {
    return super.customize_get('/pageDays', data)
  }
  pageDaysExport(data) {
    return super.customize_export_post('/pageDays/export', data)
  }
  pageOperationAnalysis(data) {
    return super.customize_get('/pageOperationAnalysis', data)
  }
  pageOperationAnalysisExport(data) {
    return super.customize_export_post('/pageOperationAnalysis/export', data)
  }
  pageTransactionDetails(data) {
    return super.customize_get('/pageTransactionDetails', data)
  }
  pageTransactionDetailsExport(data) {
    return super.customize_export_post('/pageTransactionDetailsExport/export', data)
  }
}

export default new TradeOfSaleStatisApi()
