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
            <base-input v-model="QueryParams.account" placeholder="请输入会员类别"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.account" placeholder="请输入一级单位"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.account" placeholder="请输入员工工号"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.account" placeholder="请输入联系方式"/>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" @click.stop="Mixins_$Del(scope.row)">
          冻结账号
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
          解封账号
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
        @cancel="Mixins_$DialogVisible = false"
      >
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysUserApi'

export default {
  name: 'Account',
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '会员姓名', prop: 'account' },
        { label: '会员类别', prop: 'account' },
        { label: '一级单位', prop: 'account' },
        { label: '一级部门', prop: 'a' },
        { label: '员工工号', prop: 'account' },
        { label: '联系方式', prop: 'account' }
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
      DialogFormRules: {
        account: [
          { required: true }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '微信昵称', prop: 'account' },
        { label: '会员姓名', prop: 'account' },
        { label: '会员类别', prop: 'account' },
        { label: '一级单位', prop: 'account' },
        { label: '一级部门', prop: 'account' },
        { label: '员工工号', prop: 'account' },
        { label: '联系方式', prop: 'account' },
        { label: '注册时间', prop: 'account' },
        { label: '消费金额', prop: 'account' },
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
