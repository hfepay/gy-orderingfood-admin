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
        <base-form :inline="true" :model="QueryParams" :rules="QueryParamsRules" :show-default-foot="false">
          <el-form-item>
            <base-input v-model="QueryParams.orderNo" placeholder="请输入订单号"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.memberName" placeholder="请输入会员姓名"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.memberMobile" placeholder="请输入联系方式"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.dishName" placeholder="请输入菜品名称"/>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="11"><base-input v-model="QueryParams.startPrice" type="number" placeholder="订单价格区间"/></el-col>
              <el-col :span="2" style="text-align: center">至</el-col>
              <el-col :span="11"><base-input v-model="QueryParams.endPrice" type="number" placeholder="订单价格区间"/></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <order-type-select v-model="QueryParams.orderStatus"/>
          </el-form-item>
          <el-form-item>
            <delivery-type-select v-model="QueryParams.transportType"/>
          </el-form-item>
          <el-form-item prop="distributionDate">
            <base-date-picker v-model="QueryParams.distributionDate" placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.distributionType" placeholder="全部配送时间段"/>
          </el-form-item>
          <el-form-item>
            <base-date-picker v-model="QueryParams.timeRange" type="daterange" placeholder="请选择下单时间段"/>
          </el-form-item>
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
        {{scope.row.list.map(item => `${item.dishName}：${item.dishNumber}`).join(',')}}
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          详情
        </el-button>
        <el-button v-if="+scope.row.orderStatus === 2" type="success" @click.stop="updateOrderStatus(scope.row)">
          完成配送
        </el-button>
        <el-tag v-else type="success" size="medium" style="margin: 0 4px">{{orderStatus[scope.row.orderStatus]}}
        </el-tag>
        <el-button @click.stop="Mixins_$Del(scope.row)" type="danger">
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
            <base-table :data="DialogForm.list" :headers="DetailHeaders"></base-table>
          </el-form-item>
        </template>
        <template #orderStatus>
          <el-form-item label="订单状态">
            {{orderStatus[DialogForm.orderStatus]}}
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfMemberOrderApi'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import { orderStatus, deliveryTimeStatus, transportType } from '@/constants/module/status.constans'
import orderTypeSelect from '@/views/components/Select/orderTypeSelect'
import deliveryTypeSelect from '@/views/components/Select/deliveryTypeSelect'

export default {
  name: 'Account',
  components: { deliveryTimeSelect, orderTypeSelect, deliveryTypeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '会员姓名', prop: 'memberName', type: 'text' },
        { label: '联系方式', prop: 'memberMobile', type: 'text' },
        { label: '订单内容', slot: 'orderAmount' },
        { label: '配送时间', prop: 'distributionTime', type: 'text' },
        { label: '订单金额', prop: 'orderAmount', type: 'text' },
        { label: '折扣金额', prop: 'discountAmount', type: 'text' },
        { label: '优惠后金额', prop: 'payAmount', type: 'text' },
        { label: '送餐地址', prop: 'addrMore', type: 'text' },
        { label: '订单状态', slot: 'orderStatus' },
        {
          label: '下单时间', prop: 'createTime', type: 'text', format(obj) {
            return obj
          }
        },
        { label: '支付时间', prop: 'createTime', type: 'text' }
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
    // 获取选择订单列表
    handleSelectionChange(val) {
      this.selectionList = val
    },
    // 判断该行是否可选
    selectable(row) {
      return +row.orderStatus === 2
    }
  }
}
</script>
