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
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item>
            <base-date-picker v-model="QueryParams.timeRange" type="daterange" placeholder="请选择下单时间段" />
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.distributionType" placeholder="请选择配送时间段" />
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.dishName" placeholder="请输入菜品名称" />
          </el-form-item>
          <el-form-item>
            <delivery-type-select v-model="QueryParams.transportType" />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfMemberOrderApi'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import deliveryTypeSelect from '@/views/components/Select/deliveryTypeSelect'
import { deliveryTimeStatus, transportType } from '@/constants/module/OrderConstant'

export default {
  name: 'Account',
  components: { deliveryTimeSelect, deliveryTypeSelect },
  mixins: [Mixins],
  data() {
    const date = new Date()
    return {
      ApiObject: ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '配送日期', prop: 'distributionDate' },
        { label: '配送时间段', prop: 'distributionType', format: deliveryTimeStatus },
        { label: '菜品名称', prop: 'dishName' },
        { label: '菜品类别', prop: 'foodTypeCn' },
        { label: '数量', prop: 'subtotal' },
        { label: '配送方式', prop: 'transportType', format: transportType }
      ],
      QueryParams: {
        distributionType: '',
        dishName: '',
        transportType: '',
        timeRange: [this.$Contants.getDateTime(new Date(date - 1000 * 60 * 60 * 24 * 7)),
          this.$Contants.getDateTime(new Date())]
      }
    }
  },
  computed: {
    Mixins_PageApi() { return this.ApiObject.subtotalOrder }
  }
}
</script>
