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
          <el-form-item prop="distributeType">
            <base-input v-model="DialogForm.deadline">
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
          <el-form-item prop="deadline">
            <base-input v-model="DialogForm.deadline">
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
          <el-radio v-model="radio" label="1">配置起送金额</el-radio>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="radio" label="2">配置起送份数</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="5">
          <el-form-item prop="deadline">
            <base-input v-show="+radio===1" v-model="DialogForm.deadline">
              <template slot="append">元</template>
            </base-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item prop="deadline">
            <base-input v-show="+radio===2" v-model="DialogForm.deadline">
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
          <el-form-item prop="deadline">
            <base-input v-model="DialogForm.deadline">
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
          <el-radio v-model="radio" label="1">开启</el-radio>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="radio" label="2">关闭</el-radio>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="form-bottom">
      <el-card v-for="item in 3" class="box-card">
        <div slot="header" class="hf-title">
          早餐
        </div>
        <el-row>
          <el-col class="font-bold" :span="8">
            配送费
          </el-col>
          <el-col :span="16">
            <el-form-item prop="deadline">
              <base-input v-model="DialogForm.deadline"/>
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
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOrderEarlyApi'
import daySelect from '@/views/trade/orderEarly/daySelect'
import { mapGetters } from 'vuex'

export default {
  name: 'FoodType',
  components: { daySelect },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      DialogForm: {},
      DialogFormRules: {
        distributeType: [{ required: true, message: '必填项不能为空' }],
        earlyDay: [{ required: true, message: '必填项不能为空' }],
        deadline: [{ required: true, message: '必填项不能为空' }],
        status: [{ required: true, message: '必填项不能为空' }]
      },
      radio: '1'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 提交表单之前的回调
    Mixins_$SubmitBefore() {
      this.DialogForm.businessId = this.userInfo.id
      this.DialogForm.foodTypeCn = this.$refs.foodTypeId?.list?.find(
        item => item.value === this.DialogForm.foodTypeId)?.label
      this.DialogForm.earlyDay = 30
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
