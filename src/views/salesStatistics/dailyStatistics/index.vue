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
        <el-button type="primary" @click="Mixins_$ExportExcel">
          导出excel
        </el-button>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfSaleStatisApi'
import { mapGetters } from 'vuex'

export default {
  name: 'DailyStatistics',
  mixins: [Mixins],
  data() {
    return {
      ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户名称', prop: 'businessName' },
        { label: '菜品名称', prop: 'foodName' },
        { label: '销售数量（份）', prop: 'totalNum' },
        { label: '商品总额（元）', prop: 'orderAmount' },
        { label: '实收金额', prop: 'actualAmount' }
      ],
      QueryParams: {
      },
      queryParamsformHeaders: [
        { label: '菜品名称', prop: 'foodName' },
        { label: '销售时间', prop: 'currentDate', type: 'date' }
      ],
      QueryParamsRules: {
        distributionDate: [{ required: true, message: '必填项不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    Mixins_PageApi() {
      return this.ApiObject.pageDays
    },
    Mixins_ExportApi() { return this.ApiObject.pageDaysExport },
  },
  methods: {
    // 获取最终查询条件
    Mixins_GetFinalQueryParams(data) {
      return { businessId: this.userInfo.id, ...data }
    }
  }
}
</script>
