<template>
  <el-transfer v-bind="$attrs" :data="data" v-on="$listeners"/>
</template>

<script>
import ApiObject from '../../../api/module/trade/TradeUserTobusinessApi'
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await ApiObject.list()
      this.data = res?.data.map(item => ({key: item.id, label: item.account}))
    }
  }
}
</script>
