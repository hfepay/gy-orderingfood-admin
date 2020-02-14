<template>
  <el-transfer v-bind="$attrs" :data="data" v-on="$listeners"/>
</template>

<script>
export default {
  props: {
    data: Array,
    default() {
      return []
    }
  }
}
</script>
