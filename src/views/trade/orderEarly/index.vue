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
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template #distributeType>
          <el-form-item label="菜品类别">
            <delivery-time-select v-model="DialogForm.distributeType"></delivery-time-select>
          </el-form-item>
        </template>
        <template #deadline>
          <el-form-item label="截止时间">

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

export default {
  name: 'FoodType',
  components: { foodTypeSelect, deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '菜品类别', slot: 'distributeType' },
        { label: '允许提前的天数', prop: 'earlyDay' },
        { label: '截止时间', slot: 'deadline' },
        { label: '状态', prop: 'status', type: '', options: OFFOrNO }
      ],
      DialogForm: {},
      DialogFormRules: {
        foodName: [
          { required: true, message: '必填项不能为空' }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '菜品类别', prop: 'distributeType', format: deliveryTimeStatus },
        { label: '允许提前的天数', prop: 'earlyDay' },
        { label: '状态', prop: 'status', format: OFFOrNOStatus },
        { label: '操作', slot: 'operator', width: 240 }
      ]
    }
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item=> item.value===this.DialogForm.foodTypeId)?.label
    },
    foodImgSuccess(res) {
      const data = res.data
      this.DialogForm.foodImg = data.imgName
      this.DialogForm.foodImgSmall = data.smallImgName
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
