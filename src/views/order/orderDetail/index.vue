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
            <base-input v-model="QueryParams.memberName" placeholder="请输入会员姓名"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.memberMobile" placeholder="请输入联系方式"/>
          </el-form-item>
          <el-form-item>
            <base-input v-model="QueryParams.foodName" placeholder="请输入菜品名称"/>
          </el-form-item>
          <el-form-item>
            <base-date-picker v-model="QueryParams.distributionDate" placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <deliveryTimeSelect v-model="QueryParams.distributionType" placeholder="请选择配送类型"/>
          </el-form-item>
          <el-form-item>
            <order-type-select v-model="QueryParams.orderStatus" placeholder="请选择下单状态"/>
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
        <el-button type="primary" @click="Mixins_$Add">
          批量完成配送
        </el-button>
      </template>
      <template slot="distributionDate" slot-scope="{scope}">
        {{scope.row.distributionDate || '' + deliveryTimeStatus[scope.row.distributionType]}}
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          详情
        </el-button>
        <el-button v-if="+scope.row.orderStatus < 3" type="success" @click.stop="updateOrderStatus(scope.row)">
          完成配送
        </el-button>
        <el-tag v-else type="success" size="medium" style="margin: 0 4px">{{orderStatus[scope.row.orderStatus]}}</el-tag>
        <el-button @click.stop="Mixins_$Del(scope.row)" type="danger" >
          删除订单
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
        :showDefaultFoot="false"
        :form-headers="DialogFormHeader"
        label-width="120px"
        :disabled="true"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template #dingdanneirong>
          <el-form-item label="订单内容">
            <el-button>查看</el-button>
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
import { orderStatus, deliveryTimeStatus } from '@/constants/module/status.constans'
import orderTypeSelect from '@/views/components/Select/orderTypeSelect'

export default {
  name: 'Account',
  components: { deliveryTimeSelect, orderTypeSelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogFormHeader: [
        { label: '会员姓名', prop: 'memberName' },
        { label: '联系方式', prop: 'memberMobile' },
        { label: '订单内容', slot: 'orderAmount' },
        { label: '配送时间', prop: 'distributionTime' },
        { label: '订单金额', prop: 'orderAmount' },
        { label: '折扣金额', prop: 'discountAmount' },
        { label: '优惠后金额', prop: 'payAmount' },
        { label: '送餐地址', prop: 'addrMore' },
        { label: '订单状态', prop: 'orderStatus', format: orderStatus },
        { label: '下单时间', prop: 'createTime' }
      ],
      DialogForm: {},
      Headers: [
        { type: 'index', label: '序号' },
        { label: '会员姓名', prop: 'memberName' },
        { label: '联系方式', prop: 'memberMobile' },
        { label: '菜品名称及数量', prop: 'account' },
        { label: '配送日期、时间段', slot: 'distributionDate' },
        { label: '订单金额', prop: 'orderAmount' },
        { label: '折扣金额', prop: 'discountAmount' },
        { label: '优惠后金额', prop: 'payAmount' },
        { label: '送餐地址', prop: 'addrMore' },
        { label: '订单状态', prop: 'orderStatus', format: orderStatus },
        { label: '下单时间', prop: 'createTime' },
        { label: '操作', slot: 'operator', fixed: 'right', width: 260 }
      ],
      QueryParams: {
        timeRange: []
      }
    }
  },
  computed: {
    orderStatus() {
      return orderStatus
    },
    deliveryTimeStatus() {
      return deliveryTimeStatus
    }
  },
  methods: {
    async updateOrderStatus(obj) {
      try {
        await ApiObject.updateOrderStatus(obj.id)
        this.$message.success('操作成功')
        this.Mixins_$Init()
      } catch (e) {
        this.Mixins_$Init()
      }
    }
  }
}
</script>
