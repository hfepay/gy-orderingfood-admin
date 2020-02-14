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
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button @click.stop="Mixins_$Edit(scope.row)">
          查看详情
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      title="详情"
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
        :disabled="true"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeFeedbackApi'

export default {
  name: 'Feedback',
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '微信昵称', prop: 'wechatName' },
        { label: '会员姓名', prop: 'vipName ' },
        { label: '联系方式', prop: 'mobile' },
        { label: '反馈内容', prop: 'content' },
        { label: '反馈时间', prop: 'createTime' }
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
        { label: '微信昵称', prop: 'wechatName' },
        { label: '会员姓名', prop: 'vipName ' },
        { label: '联系方式', prop: 'mobile' },
        { label: '反馈内容', prop: 'content' },
        { label: '反馈时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 120 }
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
