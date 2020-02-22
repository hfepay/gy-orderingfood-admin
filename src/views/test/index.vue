<template>
  <div>
    <el-button @click="notifyMe">通知功能</el-button>
  </div>
</template>
<script>
import { WebsocketMixins } from '@/mixins/websocket-mixins'

export default {
  name: 'Test',
  mixins: [WebsocketMixins],
  data() {
    return {
      count: 1,
      icon: require('@/assets/image/logo.png')
    }
  },
  created() {
    this.notifyMe()
  },
  methods: {
    notifyMe(body, title = '新订单通知') {
      if (!('Notification' in window)) {
        alert('此浏览器不支持通知功能，请升级浏览器！')
      } else if (Notification.permission === 'granted') {
        const n1 = new Notification
        (title, { body: `第${this.count++}单` })
        Notification.item = n1
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            new Notification('通知功能已开启！')
          }
        })
      }
      console.dir(Notification)
    }
  }
}
</script>
