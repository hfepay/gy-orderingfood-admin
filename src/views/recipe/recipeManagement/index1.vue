<template>
  <el-container class="hf-page">
    <el-header class="hf-title">
      <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
        <el-form-item>
          <base-date-picker v-model="QueryParams.timeRange" type="daterange"></base-date-picker>
        </el-form-item>
        <el-button type="primary" @click="Mixins_$Search">
          查询
        </el-button>
        <el-button type="primary" @click="Mixins_$Add">
          +新增菜品
        </el-button>
      </base-form>
    </el-header>
    <el-scrollbar class="hf-items">
      <template v-if="Object.keys(Mixins_$TableData).length>0">
        <div v-for="(item, key) in Mixins_$TableData" :key="key" class="hf-day">
          <div class="hf-day-title">{{key}}</div>
          <el-scrollbar class="hf-day-items">
            <recipe-item v-for="items in item" :food-item="items" @onclick="Mixins_$Edit(items, key)"></recipe-item>
          </el-scrollbar>
        </div>
      </template>
      <template v-else>
        <div class="nullObj">
          没有数据
        </div>
      </template>
    </el-scrollbar>
    <base-dialog
      :title="DialogForm['id']?'详情':'新增'"
      :visible.sync="Mixins_$DialogVisible"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        v-if="Mixins_$DialogVisible"
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
            <el-row>
              <el-col :span="12">
                <base-upload
                  v-if="Mixins_$DialogVisible"
                  :value="DialogForm.foodImg"
                  :show-file-list="false"
                  @success="foodImgSuccess"
                />
                <el-tag v-if="DialogForm.id" size="medium" type="info">可重新上传图片</el-tag>
              </el-col>
              <el-col v-if="DialogForm.id" :span="12">
                <el-button type="primary" v-if="+DialogForm.status === 1" @click="usable(0)">停止当日销售</el-button>
                <el-button type="primary" v-if="+DialogForm.status === 0" @click="usable(1)">开启当日销售</el-button>
                <el-button type="danger" @click="Mixins_$Del">删除当前菜品</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
        <template #foodId>
          <el-form-item label="菜品名称" prop="foodName">
            <base-input v-model="DialogForm.foodName"/>
          </el-form-item>
        </template>
        <template #foodTypeCn>
          <el-form-item label="菜品类别" prop="foodTypeId">
            <food-type-select ref="foodTypeId" v-model="DialogForm.foodTypeId"/>
          </el-form-item>
        </template>
        <template #distributeTime>
          <el-form-item label="配送时间" prop="distributeDateList">
            <el-checkbox-group v-model="DialogForm.distributeDateList">
              <el-row>
                <el-col v-for="(label, key) in distributeDateItems" :key="key" :span="8">
                  <el-checkbox :label="label">{{deliveryTimeStatus[label]}}</el-checkbox>
                  <el-form-item v-if="DialogForm.distributeDateList.includes(label)" label-width="0" :prop="key">
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
          <el-form-item label="配送日期" prop="distributeMode">
            <el-row>
              <el-col :span="10">
                <el-radio v-model="DialogForm.distributeMode" @change="DialogForm.distributeRules=[]" :label="0">按日期循环</el-radio>
              </el-col>
              <el-col :span="10">
                <el-radio v-model="DialogForm.distributeMode" @change="DialogForm.distributeRules=[]" :label="1">按指定日期生效</el-radio>
              </el-col>
            </el-row>
            <template v-if="+DialogForm.distributeMode === 0">
              <el-form-item label-width="0" prop="distributeTimeRange">
                <base-date-picker v-model="DialogForm.distributeTimeRange" type="daterange"></base-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="distributeRules">
                <week-checkbox v-model="DialogForm.distributeRules"/>
              </el-form-item>
            </template>
            <template v-if="+DialogForm.distributeMode === 1">
              <el-form-item label-width="0" prop="distributeRules">
                <el-date-picker
                  type="dates"
                  value-format="yyyy-MM-dd"
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
    const validateDistributeDateList = (rule, value, callback) => {
      if (this.DialogForm.distributeDateList.length > 0) {
        callback()
      } else {
        callback(new Error('必填项不能为空'))
      }
    }
    const validateDistributeTimeRange = (rule, value, callback) => {
      console.log(this.DialogForm.distributeTimeRange)
      if (this.DialogForm.distributeTimeRange.length > 1) {
        callback()
      } else {
        callback(new Error('必填项不能为空'))
      }
    }
    return {
      ApiObject: ApiObject,
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
        'mornStock': '0',
        'noonStock': '1',
        'eveStock': '2'
      },
      DialogForm: {
        distributeTimeRange: [],
        distributeRules: [],
        distributeMode: '0',
        distributeDateList: [],
      },
      DialogFormRules: {
        foodName: [{ required: true, message: '必填项不能为空' }],
        foodTypeId: [{ required: true, message: '必填项不能为空' }],
        price: [{ required: true, message: '必填项不能为空' }],
        isDiscount: [{ required: true, message: '必填项不能为空' }],
        stock: [{ required: true, message: '必填项不能为空' }],
        distributeMode: [{ required: true, message: '必填项不能为空' }],
        distributeDateList: [{ required: true, validator: validateDistributeDateList }],
        distributeTimeRange: [{ validator: validateDistributeTimeRange }],
        status: [{ required: true, message: '必填项不能为空' }],
        foodImg: [{ required: true, message: '必填项不能为空' }],
        mornStock: [{ required: true, message: '必填项不能为空' }],
        noonStock: [{ required: true, message: '必填项不能为空' }],
        eveStock: [{ required: true, message: '必填项不能为空' }]
      },
      checkList: [],
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
        timeRange: [
          this.$Contants.getDateTime(date),
          this.$Contants.getDateTime(new Date(date - 1000 * 60 * 60 * 24 * -7))]
      },
      distributeDate: '',
    }
  },
  computed: {
    deliveryTimeStatus() {
      return deliveryTimeStatus
    }
  },
  methods: {
    // 编辑
    async Mixins_$Edit(obj, date) {
      this.Mixins_EditBefore()
      const res = await this.Mixins_GetApi.call(this.ApiObject, {foodId:obj.foodId,currentDate: obj.currentDate })
      const data = res.data
      const finalEditParams = this.Mixins_GetFinalEditParams(data)
      this.DialogForm = { ...this.DialogForm, ...finalEditParams }
      console.log(this.DialogForm)
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.EDIT)
      this.Mixins_$DialogVisible = true
      this.distributeDate = date
      this.Mixins_EditAfter(res, finalEditParams)
      return true
    },
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      // 对订餐时间进行处理
      Object.values(this.distributeDateItems).forEach(item => {
        if (this.DialogForm.distributeDateList.includes(item)) return
        delete this.DialogForm[item]
      })
      if (+this.DialogForm.distributeMode === 1) {
        this.DialogForm.distributeTimeRange = []
      }
      // 对时间范围进行处理
      this.$_parseRangeField(this.DialogForm)
      // 对校验规则进行重置
      this.DialogForm.distributeRules = this.DialogForm.distributeRules.join(',')
      // 对订餐时间进行格式化
      this.DialogForm.distributeTypes = this.DialogForm.distributeDateList.join(',')
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item => item.value === this.DialogForm.foodTypeId)?.label
      console.log(this.$refs.foodTypeId?.list)
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
    },
    Mixins_EditAfter(res, finalEditParams){
      // finalEditParams.distributeStartDate && this.DialogForm.distributeTimeRange.splice(0,1, finalEditParams.distributeStartDate)
      // finalEditParams.distributeEndDate && this.DialogForm.distributeTimeRange.splice(1, 1, finalEditParams.distributeEndDate)
      this.DialogForm.distributeTimeRange = [finalEditParams.distributeStartDate, finalEditParams.distributeEndDate]
      finalEditParams.distributeRules && (this.DialogForm.distributeRules = finalEditParams.distributeRules.split(','))
      finalEditParams.distributeTypes && (this.DialogForm.distributeDateList = finalEditParams.distributeTypes.split(','))
    },
    // 删除
    async Mixins_$Del(obj, message = '删除') {
      await this.$confirm(`确认${message}?`, message)
      const result = await this.Mixins_DelApi.call(this.ApiObject, this.DialogForm.id)
      this.Mixins_$DialogVisible = false
      this.Mixins_$Search()
      this.$message.success(result.message)
    },
    async usable(status) {
      const result = await ApiObject.usable({distributeDate: this.distributeDate, foodId: this.DialogForm.id, status})
      this.$message.success(result.message)
      this.Mixins_$DialogVisible = false
      this.Mixins_$Init()
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

    .nullObj {
      width: 100%;
      height: 200px;
      background-color: rgba(238, 238, 238, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
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
