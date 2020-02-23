<template>
  <el-container class="hf-page">
    <el-header class="hf-title">
      <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
        <el-form-item>
          <base-date-picker v-model="DialogForm.timeRange" type="daterange"></base-date-picker>
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
      <div v-for="item in 30" class="hf-day">
        <div class="hf-day-title">2020/02/12</div>
        <el-scrollbar class="hf-day-items">
          <recipe-item v-for="item in 10" @onclick="Mixins_$Edit"></recipe-item>
        </el-scrollbar>
      </div>
    </el-scrollbar>
    <base-dialog
      :title="DialogForm['id']?'详情':'新增'"
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
        <template #foodImg>
          <el-form-item label="图片" prop="foodImg">
            <base-upload
              v-if="Mixins_$DialogVisible"
              :value="DialogForm.foodImg"
              :show-file-list="false"
              @success="foodImgSuccess"
            />
          </el-form-item>
        </template>
        <template #foodId>
          <el-form-item label="菜品名称" prop="foodName">
            <base-input v-model="DialogForm.foodName"/>
          </el-form-item>
        </template>
        <template #foodTypeCn>
          <el-form-item label="菜品类别" prop="foodTypeId">
            <food-type-select v-model="DialogForm.foodTypeId"/>
          </el-form-item>
        </template>
        <template #distributeTime>
          <el-form-item label="配送时间" prop="distributeDateList">
            <el-checkbox-group v-model="distributeDateList">
              <el-row>
                <el-col v-for="(label, key) in distributeDateItems" :key="key" :span="8">
                  <el-checkbox :label="key">{{label}}</el-checkbox>
                  <el-form-item v-if="distributeDateList.includes(key)" label-width="0" :prop="key">
                    <base-input v-model="DialogForm[key]">
                      <template slot="append">份</template>
                    </base-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template #distributeDate>
          <el-form-item label="配送日期" prop="distributeDateRadio">
            <el-row>
              <el-col :span="10">
                <el-radio v-model="distributeDateRadio" label="1">按日期循环</el-radio>
              </el-col>
              <el-col :span="10">
                <el-radio v-model="distributeDateRadio" label="2">按指定日期生效</el-radio>
              </el-col>
            </el-row>
            <template v-if="+distributeDateRadio === 1">
              <el-form-item label-width="0" prop="distributeTimeRange">
                <base-date-picker v-model="DialogForm.distributeTimeRange" type="daterange"></base-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="distributeRules">
                <week-checkbox v-model="DialogForm.distributeRules"/>
              </el-form-item>
            </template>
            <template v-if="+distributeDateRadio === 2">
              <el-form-item label-width="0" prop="distributeRules">
                <el-date-picker
                  type="dates"
                  v-model="DialogForm.distributeRules"
                  placeholder="选择一个或多个日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </el-container>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeFoodApi'
import { vip, deliveryTimeStatus, OFFOrNOStatus } from '@/constants/module/status.constans'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import foodTypeSelect from '@/views/components/Select/foodTypeSelect'
import foodSelect from '@/views/components/Select/foodSelect'
import recipeItem from '@/views/recipe/recipeManagement/recipeItem'
import weekCheckbox from '@/views/recipe/recipeManagement/weekCheckbox'

export default {
  name: 'RecipeManagement',
  components: { deliveryTimeSelect, weekCheckbox, foodTypeSelect, foodSelect, recipeItem },
  mixins: [Mixins],
  data() {
    const date = new Date()
    const validateArray = (rule, value, callback) => {
      console.log(this.distributeDateList)
      if (this.distributeDateList.length > 0) {
        callback()
      } else {
        callback(new Error('必填项不能为空'))
      }
    }
    return {
      ApiObject: ApiObject,
      Mixins_$DialogVisible: true,
      Mixins_Pagination: false,
      DialogFormHeader: [
        { label: '菜品名称', slot: 'foodId' },
        { label: '菜品类别', slot: 'foodTypeCn' },
        { label: '单价', prop: 'price', type: 'number' },
        { label: '配送时间', slot: 'distributeTime' },
        { label: '配送日期', slot: 'distributeDate' },
        { label: '是否启用员工折扣', type: 'radio', prop: 'isDiscount', options: vip },
        { label: '菜品图片', slot: 'foodImg' }
      ],
      distributeDateItems: {
        'mornStock': '早餐',
        'noonStock': '午餐',
        'eveStock': '晚餐'
      },
      distributeDateList: [],
      DialogForm: {
        distributeTimeRange: [],
        distributeRules: []
      },
      DialogFormRules: {
        foodName: [{ required: true, message: '必填项不能为空' }],
        foodTypeId: [{ required: true, message: '必填项不能为空' }],
        price: [{ required: true, message: '必填项不能为空' }],
        isDiscount: [{ required: true, message: '必填项不能为空' }],
        stock: [{ required: true, message: '必填项不能为空' }],
        distributeDateRadio: [{ required: true, message: '必填项不能为空' }],
        distributeDateList: [{ required: true, validator: validateArray }],
        distributeTimeRange: [{ required: true, message: '必填项不能为空' }],
        status: [{ required: true, message: '必填项不能为空' }],
        foodImg: [{ required: true, message: '必填项不能为空' }],
        mornStock: [{ required: true, message: '必填项不能为空' }],
        noonStock: [{ required: true, message: '必填项不能为空' }],
        eveStock: [{ required: true, message: '必填项不能为空' }]
      },
      checkList: [],
      distributeDateRadio: '1',
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
        timeRange: [this.$Contants.getDateTime(new Date(date - 1000 * 60 * 60 * 24 * 7)),
          this.$Contants.getDateTime(new Date())]
      }
    }
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      // 对时间范围进行处理
      this.$_parseRangeField(this.DialogForm)
      // 对订餐时间进行处理
      Object.keys(this.distributeDateItems).forEach(item => {
        if (this.distributeDateList.includes(item)) return
        delete this.DialogForm[item]
      })
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item => item.value === this.DialogForm.foodTypeId)?.label
      // this.DialogForm.foodTypeId = this.$refs.foodId?.list?.find(
      //   item => item.value === this.DialogForm.foodId)?.foodTypeId
      // this.DialogForm.foodImg = this.$refs.foodId?.list?.find(
      //   item => item.value === this.DialogForm.foodId)?.foodImg
      // this.DialogForm.foodImgSmall = this.$refs.foodId?.list?.find(
      //   item => item.value === this.DialogForm.foodId)?.foodImgSmall
    },
    $_parseRangeField(queryParams) {
      for (const condition in queryParams) {
        // 处理时间问题
        if (condition.endsWith('imeRange') && Array.isArray(queryParams[condition])) {
          if (queryParams[condition].length > 0) {
            const key = this.$_getRangeKey(condition)
            const startKey = key ? `${key}StartDate` : 'startDate'
            const endKey = key ? `${key}EndDate` : 'endDate'
            queryParams[startKey] = queryParams[condition][0]
            queryParams[endKey] = queryParams[condition][1]
          }
          delete queryParams[condition]
        }
      }
      return queryParams
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
    foodImgSuccess(res) {
      const data = res.data
      this.DialogForm.foodImg = data.imgName
      this.DialogForm.foodImgSmall = data.smallImgName
    }
  }
}
</script>
<style lang="scss" scoped>
  .hf-page {
    width: 100%;
    height: calc(100vh - 148px);
    font-family: Source Han Sans CN;
    // 兼容el-ui的滚动条样式
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    /deep/ .hf-items > .el-scrollbar__wrap > .el-scrollbar__view {
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
      background-color: rgba(238, 238, 238, 0.4);
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
        font-size: 19px;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        background-color: rgba(238, 238, 238, 0.4);
      }

      .hf-day-items {
        height: calc(100% - 50px);
      }
    }
  }
</style>
