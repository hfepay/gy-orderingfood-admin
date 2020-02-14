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
        <template #foodTypeId>
          <el-form-item label="菜品类别">
            <food-type-select ref="foodTypeId" v-model="DialogForm.foodTypeId"/>
          </el-form-item>
        </template>
        <template #foodImg>
          <el-form-item label="图片">
            <base-upload></base-upload>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeFoodApi'
import foodTypeSelect from '@/views/components/Select/foodTypeSelect'

export default {
  name: 'FoodType',
  components: { foodTypeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '菜品名称', prop: 'foodName' },
        { label: '菜品类别', slot: 'foodTypeId' },
        { label: '图片', slot: 'foodImg' }
      ],
      DialogForm: {},
      DialogFormRules: {
        foodName: [
          { required: true, message: '必填项不能为空' }
        ]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '菜品名称', prop: 'foodName' },
        { label: '图片', prop: 'foodImg' },
        { label: '操作', slot: 'operator', width: 240 }
      ]
    }
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item=> item.value===this.DialogForm.foodTypeId)?.label
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
