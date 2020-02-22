<template>
  <el-container class="hf-page">
    <el-header class="hf-title">
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
        <el-button type="primary" @click="Mixins_$Search">
          +新增菜品
        </el-button>
      </base-form>
    </el-header>
    <el-scrollbar class="hf-items">
      <div v-for="item in 10" class="hf-day">
        <div class="hf-day-title">2020/02/12</div>
        <el-scrollbar class="hf-day-items">
          <recipe-item v-for="item in 10" @onclick="click"></recipe-item>
        </el-scrollbar>
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeFoodMenuApi'
import { vip, topOrDown } from '@/constants/module/status.constans'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import { deliveryTimeStatus, OFFOrNOStatus } from '@/constants/module/status.constans'
import foodTypeSelect from '@/views/components/Select/foodTypeSelect'
import foodSelect from '@/views/components/Select/foodSelect'
import recipeItem from '@/views/recipe/recipeManagement/recipeItem'

export default {
  name: 'RecipeManagement',
  components: { deliveryTimeSelect, foodTypeSelect, foodSelect, recipeItem },
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
    },
    click(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
  .hf-page {
    width: 100%;
    height: calc(100vh - 148px);
    font-family:Source Han Sans CN;
    // 兼容el-ui的滚动条样式
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/.hf-items>.el-scrollbar__wrap>.el-scrollbar__view {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column wrap;
    }

    .hf-title {
      height: 60px !important;
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      background-color: rgba(238,238,238,0.4);
    }
    .hf-day {
      height: 99%;
      width: 100%;
      max-width: 450px;
      margin: 0 5px;
      .hf-day-title {
        display: flex;
        justify-content: center;
        line-height: 40px;
        margin: 5px 0;
        font-size:19px;
        font-weight:bold;
        color:rgba(102,102,102,1);
        background-color: rgba(238,238,238,0.4);
      }
      .hf-day-items {
        height: calc(100% - 50px);
      }
    }
  }
</style>
