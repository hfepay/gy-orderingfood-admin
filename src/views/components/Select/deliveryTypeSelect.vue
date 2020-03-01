<template>
  <el-select
    v-bind="$attrs"
    placeholder="全部配送方式"
    clearable
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { transportType } from '@/constants/module/OrderConstant'

export default {
  name: 'DeptSelect',
  computed: {
    options() {
      return Object.keys(transportType).map((item) => ({
        value: item,
        label: transportType[item]
      }))
    }
  }
}
</script>
