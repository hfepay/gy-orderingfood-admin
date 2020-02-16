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
            <base-input v-model="QueryParams.foodName" placeholder="请输入菜品名称"/>
          </el-form-item>
          <el-form-item>
            <food-type-select v-model="QueryParams.foodTypeId"/>
          </el-form-item>
          <el-form-item>
            <base-date-picker v-model="QueryParams.distributeDate" placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.distributeType" placeholder="请选择送时间段"/>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <template slot="distributeTime" slot-scope="{scope}">
        {{scope.row.distributeTime}}  <!--todo 添加配送类型-->
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button v-if="scope.row.status !== '0'" @click.stop="setStatus(scope.row, 0)">
          菜品下架
        </el-button>
        <el-button v-else @click.stop="setStatus(scope.row, 1)" type="success" >
          菜品上架
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)" type="danger">
          菜品删除
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
        <template #foodId>
          <el-form-item label="菜品名称" prop="foodId">
            <food-select ref="foodId" v-model="DialogForm.foodId"/>
          </el-form-item>
        </template>
        <template #foodTypeCn>
          <el-form-item label="菜品类别" prop="foodTypeCn">
            <base-input v-model="DialogForm.foodTypeCn" disabled/>
          </el-form-item>
        </template>
        <template #distributeDate>
          <el-form-item label="配送日期" prop="distributeDate">
            <base-date-picker v-model="DialogForm.distributeDate"/>
          </el-form-item>
        </template>
        <template #distributeType>
          <el-form-item label="配送类型" prop="distributeType">
            <delivery-time-select v-model="DialogForm.distributeType"/>
          </el-form-item>
        </template>
        <template #distributeTime>
          <el-form-item label="配送时间" prop="distributeTime">
            <base-time-picker v-model="DialogForm.distributeTime"/>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeFoodMenuApi'
import { vip, topOrDown } from '@/constants/module/status.constans'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import { deliveryTimeStatus, OFFOrNOStatus } from '@/constants/module/status.constans'
import foodTypeSelect from '@/views/components/Select/foodTypeSelect'
import foodSelect from '@/views/components/Select/foodSelect'

export default {
  name: 'RecipeManagement',
  components: { deliveryTimeSelect, foodTypeSelect, foodSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '菜品名称', slot: 'foodId' },
        { label: '菜品类别', slot: 'foodTypeCn' },
        { label: '单价', prop: 'price', type: 'number' },
        { label: '是否启用员工折扣', type: 'radio', prop: 'isDiscount', options: vip },
        { label: '库存', prop: 'stock', type: 'number' },
        { label: '配送日期', slot: 'distributeDate' },
        { label: '配送类型', slot: 'distributeType' },
        { label: '配送时间', slot: 'distributeTime' },
        { label: '上架/下架', type: 'radio', prop: 'status', options: topOrDown }
      ],
      DialogFormRules: {
        foodId: [{ required: true, message: '必填项不能为空' }],
        price: [{ required: true, message: '必填项不能为空' }],
        isDiscount: [{ required: true, message: '必填项不能为空' }],
        stock: [{ required: true, message: '必填项不能为空' }],
        distributeDate: [{ required: true, message: '必填项不能为空' }],
        distributeType: [{ required: true, message: '必填项不能为空' }],
        distributeTime: [{ required: true, message: '必填项不能为空' }],
        status: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '菜品名称', prop: 'foodName' },
        { label: '菜品类别', prop: 'foodTypeCn' },
        { label: '单价', prop: 'price' },
        { label: '库存', prop: 'stock' },
        { label: '已销售数量', prop: 'saledNum' },
        { label: '是否启用员工折扣', prop: 'isDiscount', format: OFFOrNOStatus },
        { label: '配送日期', prop: 'distributeDate' },
        { label: '配送时间', slot: 'distributeTime', format: deliveryTimeStatus },
        { label: '操作', slot: 'operator', fixed: 'right', width: 260 }
      ],
      QueryParams: {
        distributeDate: ''
      }
    }
  },
  watch: {
    'DialogForm.foodId': function() {
      this.DialogForm.foodTypeCn = this.$refs.foodId?.list?.find(
        item => item.value === this.DialogForm.foodId)?.foodTypeCn
    }
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      this.DialogForm.foodName = this.$refs.foodId?.list?.find(
        item => item.value === this.DialogForm.foodId)?.label
      this.DialogForm.foodTypeId = this.$refs.foodId?.list?.find(
        item => item.value === this.DialogForm.foodId)?.foodTypeId
      this.DialogForm.foodImg = this.$refs.foodId?.list?.find(
        item => item.value === this.DialogForm.foodId)?.foodImg
      this.DialogForm.foodImgSmall = this.$refs.foodId?.list?.find(
        item => item.value === this.DialogForm.foodId)?.foodImgSmall
    },
    // 0上/1下架
    setStatus(row, status) {
      try {
        ApiObject.setStatus(row.id, status)
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
