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
            <base-input v-model="QueryParams.account" placeholder="请输入会员姓名"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.account" placeholder="请输入联系方式"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.account" placeholder="请输入菜品名称"/>
          </el-form-item>
          <el-form-item>
            <base-date-picker v-model="QueryParams.account" placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.account" placeholder="请选择配送时间段"/>
          </el-form-item>
          <el-form-item>
            <base-select v-model="QueryParams.account" placeholder="请选择下单状态"/>
          </el-form-item>
          <el-form-item>
            <base-date-picker v-model="QueryParams.account" placeholder="请选择下单时间段"/>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          批量完成配送
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          详情
        </el-button>
        <el-button type="danger" @click.stop="Mixins_$Del(scope.row)">
          完成配送
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
          删除订单
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      :title="DialogForm['id']?'修改':'新增'"
      :visible.sync="Mixins_$DialogVisible"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        ref="form"
        :model="DialogForm"
        :form-headers="DialogFormHeader"
        :rules="DialogFormRules"
        label-width="120px"
        @submit="Mixins_$Submit"
        :disabled="true"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template #dingdanneirong>
          <el-form-item label="订单内容">
            <el-button>查看</el-button>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysUserApi'
import BaseSelect from '@/components/select/BaseSelect'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'

export default {
  name: 'Account',
  components: { BaseSelect, deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '会员姓名', prop: 'account' },
        { label: '联系方式', prop: 'account' },
        { label: '订单内容', slot: 'dingdanneirong' },
        { label: '配送时间', prop: 'a' },
        { label: '订单金额', prop: 'account' },
        { label: '折扣金额', prop: 'account' },
        { label: '优惠后金额', prop: 'account' },
        { label: '送餐地址', prop: 'account' },
        { label: '订单状态', prop: 'account' },
        { label: '下单时间', prop: 'account' }
      ],
      DialogForm: {
        account: '',
        password: '',
        name: '',
        mobile: '',
        email: '',
        birthday: '',
        sex: '',
        deptId: [],
        empCode: '',
        roles: [],
        titleCode: '',
        status: '1',
        titleName: ''
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '会员姓名', prop: 'account' },
        { label: '联系方式', prop: 'account' },
        { label: '菜品名称及数量', prop: 'account' },
        { label: '配送日期、时间段', prop: 'account' },
        { label: '订单金额', prop: 'account' },
        { label: '折扣金额', prop: 'account' },
        { label: '优惠后金额', prop: 'account' },
        { label: '送餐地址', prop: 'account' },
        { label: '订单状态', prop: 'account' },
        { label: '下单时间', prop: 'account' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 240 }
      ],
      QueryParams: {
        account: '',
        name: '',
        deptName: ''
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
