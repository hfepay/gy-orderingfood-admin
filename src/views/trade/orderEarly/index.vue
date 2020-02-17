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
        <el-button @click.stop="Mixins_$Del(scope.row)" type="danger">
          删除
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
        label-width="120"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template #distributeType>
          <el-form-item label="配送时间段" prop="distributeType">
            <delivery-time-select v-model="DialogForm.distributeType"></delivery-time-select>
          </el-form-item>
        </template>
        <template #deadline>
          <el-form-item label="预订截止时间" prop="deadline">
            提前一天<span><base-time-picker v-model="DialogForm.deadline"></base-time-picker></span>截止预订
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOrderEarlyApi'
import foodTypeSelect from '@/views/components/Select/foodTypeSelect'
import {OFFOrNOStatus, OFFOrNO, deliveryTimeStatus} from '@/constants/module/status.constans'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'FoodType',
  components: { foodTypeSelect, deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '配送时间段', slot: 'distributeType' },
        // { label: '允许提前的天数', type: 'number', prop: 'earlyDay' },
        { label: '提前一天截止时间', slot: 'deadline' },
        { label: '状态', prop: 'status', type: 'radio', options: OFFOrNO }
      ],
      DialogForm: {},
      DialogFormRules: {
        distributeType: [{ required: true, message: '必填项不能为空' }],
        earlyDay: [{ required: true, message: '必填项不能为空' }],
        deadline: [{ required: true, message: '必填项不能为空' }],
        status: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户名称', prop: 'businessName' },
        { label: '配送时间段', prop: 'distributeType', format: deliveryTimeStatus },
        // { label: '允许提前的天数', prop: 'earlyDay' },
        { label: '提前一天截止时间', prop: 'deadline' },
        { label: '状态', prop: 'status', format: OFFOrNOStatus },
        { label: '操作', slot: 'operator', width: 240 }
      ]
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
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item=> item.value===this.DialogForm.foodTypeId)?.label
      this.DialogForm.earlyDay = 30
    },
    foodImgSuccess(res) {
      const data = res.data
      this.DialogForm.foodImg = data.imgName
      this.DialogForm.foodImgSmall = data.smallImgName
    }
  }
}
</script>
