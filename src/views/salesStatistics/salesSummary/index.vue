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
            <base-date-picker v-model="QueryParams.account" placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.account" placeholder="请选择送时间段"/>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click="Mixins_$Add(scope.row)">
          导出excel
        </el-button>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysUserApi'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'

export default {
  name: 'Account',
  components: { deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '配送日期', prop: 'account' },
        { label: '订单金额', prop: 'account' },
        { label: '实收金额', prop: 'account' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 240 }
      ],
      QueryParams: {
        account: ''
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
