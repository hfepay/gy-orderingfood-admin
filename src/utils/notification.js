export const notifyMe = (body, title = '新订单通知') => {
  if (!('Notification' in window)) {
    alert('此浏览器不支持通知功能，请升级浏览器！')
  } else if (Notification.permission === 'granted') {
    new Notification(title, { body: `第${this.count++}单` })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        new Notification('通知功能已开启！')
      }
    })
  }
}
export default notifyMe
