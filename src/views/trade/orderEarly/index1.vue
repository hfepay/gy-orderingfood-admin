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
            <base-input v-model="DialogForm.discountValue">
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
            <base-input v-model="DialogForm.discountValue">
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
          <el-radio v-model="limitType" label="0">配置起送金额</el-radio>
          <el-form-item v-if="+limitType===0" prop="limitValue">
            <base-input v-model="DialogForm.limitValue">
              <template slot="append">元</template>
            </base-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="limitType" label="1">配置起送份数</el-radio>
          <el-form-item v-if="+limitType===1" prop="limitValue">
            <base-input v-model="DialogForm.limitValue">
              <template slot="append">份</template>
            </base-input>
          </el-form-item>
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
      <el-card v-for="(label, key) in deliveryTimeStatus" class="box-card">
        <div slot="header" class="hf-title">
          {{label}}
        </div>
        <el-row>
          <el-col class="font-bold" :span="8">
            配送时间
          </el-col>
          <el-col :span="16">
            <el-form-item prop="deadline">
              <base-input v-model="DialogForm.distributeTime"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="font-bold" :span="8">
            预订截止时间
          </el-col>
          <el-col :span="16">
            <el-form-item prop="deadline">
              <day-select v-model="DialogForm.deadline"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="8">
            <el-form-item prop="deadline">
              <base-time-picker v-model="DialogForm.deadline"/>
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
        enableNotice: '1'
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
      console.log(this.userInfo)
      await ApiObject.getConf(this.userInfo.id)
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
