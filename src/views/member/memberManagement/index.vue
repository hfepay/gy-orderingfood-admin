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
            <base-input v-model="QueryParams.name" placeholder="请输入会员姓名"/>
          </el-form-item>
          <el-form-item>
            <vip-type-select v-model="QueryParams.staffType" placeholder="请选择会员类别"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.staffOneUnit" placeholder="请输入一级单位"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.staffNo" placeholder="请输入员工工号"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.mobile" placeholder="请输入联系方式"/>
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
        <el-button v-if="+scope.row.status !== 0" type="danger" @click.stop="freeze(scope.row)">
          冻结账号
        </el-button>
        <el-button v-else @click.stop="unblock(scope.row)">
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
import ApiObject from '../../../api/module/trade/TradeMemberApi'
import vipTypeSelect from '@/views/components/Select/vipTypeSelect'
import { vipType } from '@/constants/module/status.constans'

export default {
  name: 'Account',
  components: { vipTypeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '会员姓名', prop: 'name' },
        { label: '会员类别', slot: 'staffType' },
        { label: '一级单位', prop: 'staffOneUnit' },
        { label: '一级部门', prop: 'staffOneDepartment' },
        { label: '员工工号', prop: 'staffNo' },
        { label: '联系方式', prop: 'mobile' }
      ],
      DialogForm: {},
      DialogFormRules: {
        name: [{ required: true, message: '必填项不能为空' }],
        staffType: [{ required: true, message: '必填项不能为空' }],
        staffOneUnit: [{ required: true, message: '必填项不能为空' }],
        staffNo: [{ required: true, message: '必填项不能为空' }],
        mobile: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '微信昵称', prop: 'wechatNickName' },
        { label: '会员姓名', prop: 'name' },
        { label: '会员类别', prop: 'staffType', format: vipType },
        { label: '一级单位', prop: 'staffOneUnit' },
        { label: '一级部门', prop: 'staffOneDepartment' },
        { label: '员工工号', prop: 'staffNo' },
        { label: '联系方式', prop: 'mobile' },
        { label: '注册时间', prop: 'createTime' },
        { label: '消费金额', prop: 'consumptionAmount' },
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
    async freeze(obj) {
      try {
        await ApiObject.frozen(obj.id, 0)
        this.$message.success('操作成功')
        this.Mixins_$Init()
      } catch (e) {
        this.Mixins_$Init()
      }
    },
    async unblock(obj) {
      try {
        await ApiObject.frozen(obj.id, 1)
        this.$message.success('操作成功')
        this.Mixins_$Init()
      } catch (e) {
        this.Mixins_$Init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
