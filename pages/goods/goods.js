var app = getApp()
// console.log(app.globalData.items)
Page({
    data: {
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true, 
      shop: "上海百达丽医疗美容门诊部",
      name: "【眼综合】 双眼皮+内眼角开大9",
      price: 3660.00,
      volume: 1,
      array: [1,2,3,4,5,6,7,8,9,10],
      index: 0,
      parahover: "bottom-top-parahover",
      asshover: "NaN",
      paradis: "paradis",
      assdis: "NaN",
      totalnum: 0
    },
    onShow: function () {
      let totalnum = wx.getStorageSync("totalnum")
      if (totalnum) {
        this.setData({
          'totalnum': totalnum
        })
      }else{
        this.setData({
          'totalnum': 0
        })
      }
     
    },
    bindPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index: e.detail.value
        })
      },
    parahover: function () {
        this.setData({
            parahover: "bottom-top-parahover",
            asshover: "NaN",
            paradis: "paradis",
            assdis: "NaN"
        })
    },
    asshover: function () {
        this.setData({
            parahover: "NaN",
            asshover: "bottom-top-asshover",
            paradis: "NaN",
            assdis: "assdis"
        })
    },
    urltocart: function () { 

      let tocart =  {image: "", value: '',price: null,num:null,checked: true,left:0}
      tocart.value = this.data.name
      tocart.num = this.data.index*1 + 1
      tocart.price = this.data.price
      tocart.image = this.data.imgUrls[0]
      let newitems = wx.getStorageSync("newgoods")

      if (!newitems ) {
        let newgoods =[]
        newgoods.push(tocart)
        wx.setStorageSync("newgoods",newgoods)
        wx.setStorageSync("totalnum",tocart.num)
        this.setData({
          'totalnum': tocart.num
        })
      }else{
        if (newitems.length == 0) {
          let newgoods = newitems
          newgoods.push(tocart)
          wx.setStorageSync("newgoods",newgoods)
          wx.setStorageSync("totalnum",tocart.num)
          this.setData({
            'totalnum': tocart.num
          })
        }else{
                  // console.log(newitems)
        let newgoods = newitems
        // console.log(newgoods)
        for (let item = 0; item < newgoods.length; item++) {
          
          if (newgoods[item].value == tocart.value) {
            var indexitem =  item
          }
        }
        // console.log(indexitem)
        if (indexitem>=0) {
          let nowtotalnum = tocart.num
          tocart.num = tocart.num + newgoods[indexitem].num
          newgoods[indexitem].num = tocart.num
          wx.setStorageSync("newgoods",newgoods)
          let nowTotal = wx.getStorageSync("totalnum") + nowtotalnum
          wx.setStorageSync("totalnum",nowTotal)
          this.setData({
            'totalnum': nowTotal
          })
          console.log("我执行了")
        }else{
          console.log("我也执行了啊！")
          let nowtotalnum = tocart.num
          newgoods.push(tocart)
          wx.setStorageSync("newgoods",newgoods)
          let nowTotal = wx.getStorageSync("totalnum") + nowtotalnum
          wx.setStorageSync("totalnum",nowTotal)
          this.setData({
            'totalnum': nowTotal
          })
        }
        }

      }
      
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
     
     }
  })