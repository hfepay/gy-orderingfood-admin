<template>
  <div>
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-search">
        <base-form
          :inline="true"
          :model="QueryParams"
          :rules="QueryParamsRules"
          :show-default-foot="false"
          :form-headers="queryParamsformHeaders"
        >
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$ExportExcel()">
          导出excel
        </el-button>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfSaleStatisApi'
import { transactionType } from '../../../constants/module/OrderConstant'
export default {
  name: 'DailyStatistics',
  mixins: [Mixins],
  data() {
    return {
      ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户名称', prop: 'businessName' },
        { label: '订单号', prop: 'orderNo' },
        { label: '交易金额', prop: 'payAmount' },
        { label: '交易类型', prop: 'orderStatus', format: transactionType },
        { label: '交易时间', prop: 'payDate' }
      ],
      QueryParams: {
        timeRange: [this.$Contants.getDateTime(new Date()),
          this.$Contants.getDateTime(new Date())],
        distributionTypes: []
      },
      queryParamsformHeaders: [
        { label: '订单号', prop: 'orderNo' },
        { label: '交易类型', prop: 'orderStatus', type: 'select', options: this.$Contants.toOptions(transactionType) },
        { label: '交易金额最小值', prop: 'startPrice', type: 'number' },
        { label: '交易金额最大值', prop: 'endPrice', type: 'number' },
        { label: '交易时间', prop: 'timeRange', type: 'daterange' }
      ],
      QueryParamsRules: {
        distributionDate: [{ required: true, message: '必填项不能为空' }]
      }
    }
  },
  computed: {
    Mixins_PageApi() {
      return this.ApiObject.pageTransactionDetails
    },
    Mixins_ExportApi() { return this.ApiObject.pageTransactionDetailsExport }
  }
}
</script>
