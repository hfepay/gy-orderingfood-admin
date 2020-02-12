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
import { OFFOrNO} from '@/constants/module/status.constans'

export default {
  name: 'Account',
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '折扣', prop: 'account' },
        { label: '启用', type: 'radio', prop: 'account', options: OFFOrNO }
      ],
      DialogForm: {
        account: ''
      },
      DialogFormRules: {
        account: [
          { required: true }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '折扣', prop: 'account' },
        { label: '是否启用', prop: 'account' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 80 }
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
