import utils from '@/utils/common'
export const notifyMe = (body, title = '新订单通知', imgUrl) => {
  if (!('Notification' in window)) {
    alert('此浏览器不支持通知功能，请升级浏览器！')
  } else if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: utils.imgWrapper(imgUrl) })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification('订单通知已开启！')
      }
    })
  }
}
export default notifyMe
