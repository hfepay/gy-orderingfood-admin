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
        <template #discountValue>
          <el-form-item label="折扣" prop="discountValue">
            <el-input v-model="DialogForm.discountValue" type="number">
              <template slot="append">折</template>
            </el-input>
          </el-form-item>
        </template>
        <template #memberType>
          <el-form-item label="会员类别" prop="memberType">
            <vip-type-select v-model="DialogForm.memberType"/>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeMemberDiscountApi'
import { OFFOrNO, OFFOrNOStatus, vipType } from '@/constants/module/status.constans'
import vipTypeSelect from '@/views/components/Select/vipTypeSelect'
import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  components: { vipTypeSelect },
  mixins: [Mixins],
  data() {
    const discountValueRegex = /^[1-9](\.[0-9])?$/
    const discountValueRule = (rule, value, callback) => {
      if (!discountValueRegex.test(value)) {
        callback(new Error('请输入1-9.9的数字'))
      } else {
        callback()
      }
    }
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '折扣', slot: 'discountValue' },
        { label: '会员类别', slot: 'memberType' },
        { label: '是否启用', type: 'radio', prop: 'status', options: OFFOrNO }
      ],
      DialogForm: {},
      DialogFormRules: {
        discountValue: [
          { required: true, message: '必填项不能为空' },
          { validator: discountValueRule }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        // { label: '商户名称', prop: 'businessName' },
        { label: '会员类别', prop: 'memberType', format: vipType },
        { label: '折扣', prop: 'discountValue', format: item => item.discountValue * 10 },
        // { label: '是否启用', prop: 'status', format: OFFOrNOStatus },
        { label: '操作', slot: 'operator', fixed: 'right', width: 80 }
      ],
      QueryParams: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      this.DialogForm.businessId = this.userInfo.id
      this.DialogForm.discountValue /= 10
    },
    Mixins_EditAfter(res, finalEditParams) {
      this.DialogForm.discountValue *= 10
    }
  }
}
</script>
