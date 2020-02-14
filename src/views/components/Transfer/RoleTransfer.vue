<template>
  <el-transfer v-bind="$attrs" :data="data" v-on="$listeners"/>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData()
    }
  }
}
</script>
