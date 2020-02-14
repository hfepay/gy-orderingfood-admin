import TradeApi from './TradeApi'
class TradeUserToBusinessApi extends TradeApi {
  constructor() {
    super('userToBusiness')
  }
  setRole(roleId, companyId) {
    return super.customize_put(`/${roleId}/${companyId}`)
  }
}

export default new TradeUserToBusinessApi()
