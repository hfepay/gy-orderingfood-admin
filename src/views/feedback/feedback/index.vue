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
        <base-form :inline="true" :model="QueryParams" :rules="QueryParamsRules" :show-default-foot="false">
          <el-form-item>
            <base-date-picker
              v-model="QueryParams.timeRange"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              placeholder="请选择配送日期"
            />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
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
        :show-default-foot="false"
        :form-headers="DialogFormHeader"
        label-width="120px"
        :disabled="true"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      />
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
        { label: '微信昵称', prop: 'wechatName', type: 'text' },
        { label: '会员姓名', prop: 'vipName ', type: 'text' },
        { label: '联系方式', prop: 'mobile', type: 'text' },
        { label: '反馈内容', prop: 'content', type: 'text' },
        { label: '反馈时间', prop: 'createTime', type: 'text' }
      ],
      DialogForm: {},
      Headers: [
        { type: 'index', label: '序号' },
        { label: '微信昵称', prop: 'wechatName' },
        { label: '会员姓名', prop: 'vipName' },
        { label: '联系方式', prop: 'mobile' },
        { label: '反馈内容', prop: 'content' },
        { label: '反馈时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 120 }
      ],
      QueryParams: {
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
