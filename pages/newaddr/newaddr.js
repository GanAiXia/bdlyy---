Page({
 data: {
    region: [],
    customItem: '全部',
    shqs: '省、市、区、乡镇/街道：' 
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let shq = e.detail.value
    if (shq[0] == "全部" || shq[1] == "全部" || shq[2] == "全部") {
        this.setData({
            shqs: '省、市、区、乡镇/街道：请补全信息' 
          })
    }else{
        this.setData({
            region: e.detail.value
          })
    }
   
  }
})