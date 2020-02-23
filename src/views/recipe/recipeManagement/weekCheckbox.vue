<template>
  <div>
    <el-checkbox-group v-bind="$attrs" v-on="$listeners">
      <el-checkbox v-for="(item,$index) in options" :key="$index" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>

export default {
  name: 'RoleCheckbox',
  data() {
    return {
      options: [
        { value: '7', label: '日' },
        { value: '1', label: '一' },
        { value: '2', label: '二' },
        { value: '3', label: '三' },
        { value: '4', label: '四' },
        { value: '5', label: '五' },
        { value: '6', label: '六' }
      ]
    }
  }
}
</script>
