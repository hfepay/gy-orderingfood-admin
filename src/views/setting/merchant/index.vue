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
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
          删除
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      :title="DialogForm['id']?'修改':'新增'"
      top="5vh"
      width="500px"
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
        <template #logoImg>
          <el-form-item label="商户logo" prop="logoImg">
            <base-upload></base-upload>
          </el-form-item>
        </template>
        <template #qualityImg>
          <el-form-item label="营业执照" prop="qualityImg">
            <base-upload></base-upload>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeBusinessApi'

export default {
  name: 'Account',
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '商户全称', prop: 'businessName' },
        { label: '商户简称', prop: 'businessShortName' },
        { label: '商户logo', slot: 'logoImg' },
        { label: '商户电话', prop: 'mobile' },
        { label: '商户地址', prop: 'address' },
        { label: '商户简介', type: 'textarea', prop: 'introduction' },
        { label: '营业执照', slot: 'qualityImg' }
      ],
      DialogForm: {
        account: ''
      },
      DialogFormRules: {
        businessName: [{ required: true, message: '必填项不能为空' }],
        businessShortName: [{ required: true, message: '必填项不能为空' }],
        mobile: [{ required: true, message: '必填项不能为空' }],
        address: [{ required: true, message: '必填项不能为空' }],
        qualityImg: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户全称', prop: 'businessName' },
        { label: '商户简称', prop: 'businessShortName' },
        { label: '商户电话', prop: 'mobile' },
        { label: '商户地址', prop: 'address' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 180 }
      ]
    }
  },
  methods: {}
}
</script>
