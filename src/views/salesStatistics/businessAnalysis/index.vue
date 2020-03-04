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
        <base-form :inline="true" :model="QueryParams" :rules="QueryParamsRules" :show-default-foot="false">
          <el-form-item>
            <base-date-picker
              v-model="QueryParams.timeRange"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              placeholder="请选择日期范围"
            />
          </el-form-item>
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
import ApiObject from '../../../api/module/trade/TradeOfMemberOrderApi'
import { mapGetters } from 'vuex'

export default {
  name: 'BusinessAnalysis',
  mixins: [Mixins],
  data() {
    const date = new Date()
    return {
      ApiObject: ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户名称', prop: 'businessName' },
        { label: '销售日期', prop: 'todo' },
        { label: '订单数量', prop: 'todo' },
        { label: '自取订单', prop: 'todo' },
        { label: '外卖订单', prop: 'todo' },
        { label: '商品总额（元）', prop: 'todo' },
        { label: '配送费收入（元）', prop: 'todo' },
        { label: '优惠金额（元）', prop: 'todo' },
        { label: '实收金额（元）', prop: 'todo' },
        { label: '微信支付（元）', prop: 'todo' },
        { label: '微信支付（元）', prop: 'todo' },
        { label: '线下支付（元）', prop: 'todo' }
      ],
      QueryParams: {
        timeRange: [this.$Contants.getDateTime(new Date(date - 1000 * 60 * 60 * 24 * 30)),
          this.$Contants.getDateTime(new Date())]
      },
      QueryParamsRules: {
      }
    }
  },
  computed: {
    Mixins_PageApi() {
      return this.ApiObject.subtotalSale
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    Mixins_ExportApi() {
      return ApiObject.export
    },
    // 获取最终查询条件
    Mixins_GetFinalQueryParams(data) {
      return { businessId: this.userInfo.id, ...data }
    }
  }
}
</script>
