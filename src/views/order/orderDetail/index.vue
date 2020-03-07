<template>
  <div>
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      @selection-change="handleSelectionChange"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-search">
        <base-form
          :form-headers="queryParamsHeaders"
          :inline="true"
          :model="QueryParams"
          :rules="QueryParamsRules"
          :show-default-foot="false"
        >
          <!--<el-form-item>
            <base-date-picker
              v-model="QueryParams.timeRange"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              placeholder="请选择配送日期"
            />
          </el-form-item>-->
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="updateOrderStatusList()">
          批量完成配送
        </el-button>
      </template>
      <template slot="foodList" slot-scope="{scope}">
        {{ scope.row.list.map(item => `${item.dishName}：${item.dishNumber}`).join(',') }}
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          详情
        </el-button>
        <el-button v-if="scope.row.orderStatus == 2" type="success" @click.stop="updateOrderStatus(scope.row)">
          完成配送
        </el-button>
        <el-button v-if="scope.row.orderStatus == 7" type="danger" @click.stop="showReviewDialog(scope.row)">
          审核
        </el-button>
        <el-button v-if="scope.row.orderStatus == 10" type="success" @click.stop="resolved(scope.row)">
          已解决
        </el-button>
        <el-button type="danger" @click.stop="Mixins_$Del(scope.row)">
          删除订单
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      title="订单详情"
      :visible.sync="Mixins_$DialogVisible"
      top="5vh"
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
      >
        <template #orderAmount>
          <el-form-item label="订单详情">
            <base-table :data="DialogForm.list" :headers="DetailHeaders" />
          </el-form-item>
        </template>
        <template #orderStatus>
          <el-form-item label="订单状态">
            {{ orderStatus[DialogForm.orderStatus] }}
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
    <base-dialog
      title="退款审核表"
      :visible.sync="reviewDialogVisible"
      top="5vh"
      center
    >
      <base-form
        :model="DialogForm"
        confirm-btn-text="审核通过"
        cancel-btn-text="审核不通过"
        :form-headers="reviewDialogFormHeader"
        @submit="reviewSuccess"
        @cancel="reviewFail"
      >
        <template #orderAmount>
          <el-form-item label="订单详情">
            <base-table :data="DialogForm.list" :headers="DetailHeaders" />
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfMemberOrderApi'
import { orderStatus, deliveryTimeStatus, transportType, payType, REVIEW_STATUS_ENUM } from '@/constants/module/OrderConstant'

export default {
  name: 'Account',
  mixins: [Mixins],
  data() {
    return {
      reviewDialogVisible: false,
      ApiObject,
      reviewDialogFormHeader: [
        { label: '订单号', prop: 'orderNo', type: 'text' },
        { label: '下单时间', prop: 'createTime', type: 'text' },
        { label: '收款人姓名', prop: 'memberName', type: 'text' },
        { label: '联系方式', prop: 'memberMobile', type: 'text' },
        { label: '配送方式', prop: 'transportType', type: 'text', format: transportType },
        { label: '支付方式', prop: 'payType', type: 'text', format: payType },
        { label: '退款金额', prop: 'payAmount', type: 'text' },
        { label: '订单内容', slot: 'orderAmount' }
      ],
      DialogFormHeader: [
        { label: '订单号', prop: 'orderNo', type: 'text' },
        { label: '会员姓名', prop: 'memberName', type: 'text' },
        { label: '联系方式', prop: 'memberMobile', type: 'text' },
        { label: '订单内容', slot: 'orderAmount' },
        { label: '配送方式', prop: 'transportType', type: 'text', format: transportType },
        { label: '支付方式', prop: 'payType', type: 'text', format: payType },
        { label: '配送日期', prop: 'distributionDate', type: 'text' },
        { label: '配送时间', prop: 'distributionTime', type: 'text' },
        { label: '配送费', prop: 'transportFee', type: 'text' },
        { label: '订单金额', prop: 'orderAmount', type: 'text' },
        { label: '优惠金额', prop: 'discountAmount', type: 'text' },
        { label: '实付款', prop: 'payAmount', type: 'text' },
        { label: '送餐地址', prop: 'addrMore', type: 'text' },
        { label: '订单状态', slot: 'orderStatus' },
        { label: '下单时间', prop: 'createTime', type: 'text' },
        { label: '支付时间', prop: 'payDate', type: 'text' },
        { label: '备注', prop: 'memberRemark', type: 'text' }
      ],
      DialogForm: {},
      DetailHeaders: [
        { label: '菜品名称', prop: 'dishName' },
        { label: '数量', prop: 'dishNumber' },
        { label: '单价', prop: 'dishUnitPrice' }
      ],
      selectionList: [],
      Headers: [
        { type: 'selection', selectable: this.selectable },
        { type: 'index', label: '序号' },
        { label: '订单号', prop: 'orderNo' },
        { label: '会员姓名', prop: 'memberName' },
        { label: '联系方式', prop: 'memberMobile' },
        { label: '配送方式', prop: 'transportType', format: transportType },
        { label: '支付方式', prop: 'payType', format: payType },
        { label: '菜品名称及数量', slot: 'foodList' },
        { label: '配送日期', prop: 'distributionDate' },
        { label: '时间段', prop: 'distributionType', format: deliveryTimeStatus },
        { label: '订单金额', prop: 'orderAmount' },
        // { label: '折扣金额', prop: 'discountAmount' },
        { label: '实付', prop: 'payAmount' },
        { label: '送餐地址', prop: 'addrMore' },
        { label: '订单备注', prop: 'memberRemark' },
        { label: '订单状态', prop: 'orderStatus', format: orderStatus },
        { label: '下单时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 260 }
      ],
      QueryParams: {
        timeRange: [],
        distributionDate: this.$Contants.getDateTime(new Date())
      },
      queryParamsHeaders: [
        { label: '订单号', prop: 'orderNo' },
        { label: '会员姓名', prop: 'memberName' },
        { label: '联系方式', prop: 'memberMobile' },
        { label: '菜品名称', prop: 'dishName' },
        { label: '订单价格最小值', prop: 'startPrice', type: 'number' },
        { label: '订单价格最大值', prop: 'endPrice', type: 'number' },
        { label: '订单状态', prop: 'orderStatus', type: 'select', options: this.$Contants.toOptions(orderStatus) },
        { label: '配送方式', prop: 'transportType', type: 'select', options: this.$Contants.toOptions(transportType) },
        { label: '配送日期', prop: 'distributionDate', type: 'date' },
        { label: '配送时间段', prop: 'distributionType', type: 'select', options: this.$Contants.toOptions(deliveryTimeStatus) },
        { label: '下单时间', prop: 'timeRange', type: 'daterange' }
      ],
      QueryParamsRules: {
        distributionDate: [{ required: true, message: '必填项不能为空' }]
      }
    }
  },
  computed: {
    orderStatus() {
      return orderStatus
    }
  },
  methods: {
    // 审核通过
    reviewSuccess() {
      this.review(REVIEW_STATUS_ENUM.SUCCESS)
    },
    // 审核不通过
    reviewFail() {
      this.review(REVIEW_STATUS_ENUM.FAIL)
    },
    async review(audit) {
      const orderId = this.DialogForm.id
      const res = await ApiObject.audit({ orderId, audit })
      this.$message.success(res.message)
      this.reviewDialogVisible = false
      this.Mixins_$Init()
    },
    async resolved(obj) {
      await this.$confirm(`确认已解决?`)
      const res = await ApiObject.resolved(obj.id)
      this.$message.success(res.message)
      this.Mixins_$Init()
    },
    async showReviewDialog(obj) {
      await this.Mixins_$InitDialogForm(obj)
      this.reviewDialogVisible = true
    },
    async updateOrderStatus(obj) {
      await this.$confirm(`是否开始配送当前订单?`, '配送')
      try {
        await ApiObject.updateOrderStatus(obj.id)
        this.$message.success('操作成功')
        this.Mixins_$Init()
      } catch (e) {
        this.Mixins_$Init()
      }
    },
    // 批量更新订单状态
    async updateOrderStatusList(row) {
      if (this.selectionList && this.selectionList.length > 0) {
        try {
          await this.$confirm(`是否开始配送已选订单?`, '确认')
          await ApiObject.updateOrderStatus(...this.selectionList.map(item => item.id))
        } finally {
          this.Mixins_$Init()
        }
      } else {
        this.$message.warning('请先选择订单')
      }
    },
    $_parseRangeField(queryParams) {
      for (const condition in queryParams) {
        // 处理时间问题
        if (condition.endsWith('imeRange') && Array.isArray(queryParams[condition])) {
          if (queryParams[condition].length > 0) {
            const key = this.$_getRangeKey(condition)
            const startKey = key ? `${key}StartTime` : 'startTime'
            const endKey = key ? `${key}EndTime` : 'endTime'
            queryParams[startKey] = queryParams[condition][0]
            queryParams[endKey] = queryParams[condition][1]
          }
          delete queryParams[condition]
        }
      }
      return queryParams
    },
    // 获取选择订单列表
    handleSelectionChange(val) {
      this.selectionList = val
    },
    // 判断该行是否可选
    selectable(row) {
      return row.orderStatus == 2
    }
  }
}
</script>
