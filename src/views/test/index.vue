<template>
  <div>
    <el-button @click="notifyMe">通知功能</el-button>
  </div>
</template>
<script>
import { WebsocketMixins } from '@/mixins/websocket-mixins'
import notifyMe from '@/utils/notification'

export default {
  name: 'Test',
  mixins: [WebsocketMixins],
  data() {
    return {
      websocketUrl: 'ws://localhost:8001',
      count: 1,
      icon: require('@/assets/image/logo.png')
    }
  },
  methods: {
    websocketonmessageCallBack(data) {
      notifyMe(data.content, data.title, data.imgUrl)
    }
  }
}
</script>
