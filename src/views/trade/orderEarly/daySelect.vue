<template>
  <el-select
    v-bind="$attrs"
    :placeholder="placeholder || '请选择配送时间段'"
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

export default {
  name: 'DeptSelect',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    options() {
      return [
        { value: '0', label: '配送当天' },
        { value: '1', label: '配送前一天' },
        { value: '2', label: '配送前二天' },
        { value: '3', label: '配送前三天' },
        { value: '4', label: '配送前四天' },
        { value: '5', label: '配送前五天' },
        { value: '6', label: '配送前六天' }
      ]
    }
  }
}
</script>
