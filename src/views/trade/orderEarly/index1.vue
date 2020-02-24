<template>
  <base-form
    ref="form"
    :model="DialogForm"
    :rules="DialogFormRules"
    @submit="Mixins_$Submit"
    @cancel="Mixins_$DialogVisible = false"
  >
    <div class="form-top">
      <el-row>
        <el-col class="font-bold" :span="5">
          员工折扣
        </el-col>
        <el-col :span="3">
          集团员工
        </el-col>
        <el-col :span="5">
          <el-form-item prop="discountValue">
            <base-input v-model="DialogForm.discountValue1">
              <template slot="append">折</template>
            </base-input>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="4">
          驻场单位员工
        </el-col>
        <el-col :span="5">
          <el-form-item prop="discountValue">
            <base-input v-model="DialogForm.discountValue2" type="number">
              <template slot="append">折</template>
            </base-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="font-bold" :span="5">
          外卖配送条件
        </el-col>
        <el-col :span="8">
          <el-radio v-model="DialogForm.limitType" label="0">配置起送金额</el-radio>
          <el-form-item v-if="+DialogForm.limitType===0" prop="limitValue">
            <base-input v-model="DialogForm.limitValue">
              <template slot="append">元</template>
            </base-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="DialogForm.limitType" label="1">配置起送份数</el-radio>
          <el-form-item v-if="+DialogForm.limitType===1" prop="limitValue">
            <base-input v-model="DialogForm.limitValue">
              <template slot="append">份</template>
            </base-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-radio v-model="DialogForm.limitType" label="3">不配置</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="font-bold" :span="5">
          配送费
        </el-col>
        <el-col :span="6">
          <el-form-item prop="transportFee">
            <base-input v-model="DialogForm.transportFee">
              <template slot="append">元</template>
            </base-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="font-bold" :span="5">
          订单通知
        </el-col>
        <el-col :span="8">
          <el-radio v-model="DialogForm.enableNotice" label="0">开启</el-radio>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="DialogForm.enableNotice" label="1">关闭</el-radio>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="form-bottom">
      <el-card v-for="(label, key) in deliveryTimeStatus" :key="key" class="box-card">
        <div slot="header" class="hf-title">
          {{label}}
        </div>
        <el-row>
          <el-col class="font-bold" :span="8">
            配送时间
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <base-time-picker v-model="DialogForm[`distributeTime${key}`]"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="font-bold" :span="8">
            预订截止时间
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <day-select v-model="DialogForm[`earlyDay${key}`]"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="8">
            <el-form-item>
              <base-time-picker v-model="DialogForm[`deadline${key}`]"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </base-form>
</template>
<script>
import ApiObject from '../../../api/module/trade/TradeBusinessApi'
import daySelect from '@/views/trade/orderEarly/daySelect'
import { mapGetters } from 'vuex'
import { deliveryTimeStatus } from '@/constants/module/status.constans'

export default {
  name: 'FoodType',
  components: { daySelect },
  data() {
    return {
      ApiObject: ApiObject,
      DialogForm: {
        discountValue1: '',
        discountValue2: '',
        // 配送类型
        limitType: '',
        distributeTime0: '',
        distributeTime1: '',
        distributeTime2: '',
        earlyDay0: '',
        earlyDay1: '',
        earlyDay2: '',
        deadline0: '',
        deadline1: '',
        deadline2: ''
      },
      DialogFormRules: {
        distributeType: [{ required: true, message: '必填项不能为空' }],
        earlyDay: [{ required: true, message: '必填项不能为空' }],
        deadline: [{ required: true, message: '必填项不能为空' }],
        status: [{ required: true, message: '必填项不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    deliveryTimeStatus() {
      return deliveryTimeStatus
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await ApiObject.getConf(this.userInfo.companyId)
      const data = res.data
      this.DialogForm = { ...this.DialogForm, ...data }
      // 回显员工折扣
      const discountValues = (data.discounts || []).filter(item => +item.status === 1)
      ;(discountValues || []).forEach(item => {
        if (+item.memberType === 1) this.DialogForm.discountValue1 = item.discountValue * 10
        if (+item.memberType === 2) this.DialogForm.discountValue2 = item.discountValue * 10
      })
      // 回显用餐时间配置
      const earlies = data.earlies
      ;(earlies || []).forEach(item => {
        if (+item.status === 1 && '012'.includes(item.distributeType)) {
          const key = item.distributeType
          this.DialogForm[`distributeTime${key}`] = item.distributeTime
          this.DialogForm[`earlyDay${key}`] = item.earlyDay
          this.DialogForm[`deadline${key}`] = item.deadline
        }
      })
      if (!'01'.includes(data.limitType) || (+data.limitValue === 0 && +data.limitType === 1)) this.DialogForm.limitType = '3'
    },
    async Mixins_$Submit() {
      await this.$confirm(`是否保存当前设置?`, '确认')
      const result = {}
      result.businessId = this.userInfo.companyId
      // 添加折扣
      result.discounts = []
      this.DialogForm.discountValue1 && result.discounts.push({
        discountValue: this.DialogForm.discountValue1 / 10,
        memberType: '1'
      })
      this.DialogForm.discountValue2 && result.discounts.push({
        discountValue: this.DialogForm.discountValue2 / 10,
        memberType: '2'
      })
      // 格式化配送条件
      if (+this.DialogForm.limitType !== 3) {
        result.limitType = this.DialogForm.limitType
        result.limitValue = this.DialogForm.limitValue
      } else {
        result.limitType = '1'
        result.limitValue = 0
      }
      result.transportFee = this.DialogForm.transportFee
      result.enableNotice = this.DialogForm.enableNotice
      // 回显用户配置
      result.earlies = []
      Object.keys(deliveryTimeStatus).forEach(key => {
        result.earlies.push({
          distributeType: key,
          distributeTime: this.DialogForm[`distributeTime${key}`],
          earlyDay: this.DialogForm[`earlyDay${key}`],
          deadline: this.DialogForm[`deadline${key}`]
        })
      })
      const res = await ApiObject.conf(result)
      this.$message.success(res.message)
      this.DialogForm = this.$utils.reset(this.DialogForm)
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
  .form-top {
    width: 600px;
    line-height: 30px;

    .font-bold {
      font-weight: bold;
    }
  }

  .form-bottom {
    width: 100%;
    line-height: 30px;
    display: flex;

    .hf-title {
      width: 100%;
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      text-align: center;
    }

    .box-card {
      width: 30%;
      margin: 10px 1.5% 20px;
    }
  }
</style>
