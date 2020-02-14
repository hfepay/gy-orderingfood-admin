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
            <base-date-picker v-model="QueryParams.distributionDate" placeholder="请选择配送时间"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.distributionType" placeholder="请选择配送时间段"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.dishName" placeholder="请输入菜品名称"/>
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
import { deliveryTimeStatus } from '@/constants/module/status.constans'

export default {
  name: 'Account',
  components: { deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '配送日期', prop: 'distributionDate' },
        { label: '配送时间段', prop: 'distributionType', format: deliveryTimeStatus },
        { label: '菜品名称', prop: 'dishName' },
        { label: '菜品类别', prop: 'foodTypeCn ' },
        { label: '数量', prop: 'subtotal' }
      ],
      QueryParams: {
      }
    }
  },
  computed: {
    Mixins_PageApi() { return this.ApiObject.subtotalOrder }
  },
  methods: {
    // 如果表格数据不符合规范，这里可自定义返回数据
    Mixins_GetFinalTableData(data) {
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
