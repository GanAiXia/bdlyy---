Page({
    data: {
        items: [],
        totalmoney: 0.00,
        totalnum: 0,
        isChecked: true,
        delBtnWidth:180,
        startX: 0,
      },
      onLoad: function () {
        var that = this
        let nowitems = wx.getStorageSync("newgoods")
        console.log(nowitems)
        that.setData({
          'items': nowitems
        })
        console.log(this.data.items)
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum
        let items = this.data.items
        let isChecked = this.isChecked
        for (let item = 0; item < items.length; item++) {
          if (items[item].checked == true) {
            totalmoney += items[item].num * items[item].price
            totalnum += items[item].num
          }
          if (items[item].checked == false) {
            isChecked = false
          }
        }
        this.setData({
          'totalmoney' : totalmoney,
          'totalnum' : totalnum,
          'isChecked': isChecked
        })
        wx.setStorageSync("totalnum",totalnum)
      },
      onShow: function () {
        var that = this
        let nowitems = wx.getStorageSync("newgoods")
        console.log(nowitems)
        that.setData({
          'items': nowitems
        })
        console.log(this.data.items)
        let totalmoney = this.data.totalmoney
        totalmoney = 0.00
        let totalnum = this.data.totalnum
        totalnum = 0
        let items = this.data.items
        let isChecked = this.isChecked
        for (let item = 0; item < items.length; item++) {
          if (items[item].checked == true) {
            totalmoney += items[item].num * items[item].price
            totalnum += items[item].num
          }
          if (items[item].checked == false) {
            isChecked = false
          }
        }
        this.setData({
          'totalmoney' : totalmoney,
          'totalnum' : totalnum,
          'isChecked': isChecked
        })
        wx.setStorageSync("totalnum",totalnum)
      },
      bindPlusNum: function(e) {
        let ref = e.currentTarget.dataset.index
        let items = this.data.items
        let nownum = this.data.items[ref].num
        let nowprice = this.data.items[ref].price
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum
        nownum +=1

        if (items[ref].checked == true) {
          totalnum +=1
          totalmoney = totalmoney + nowprice
        }else{
          totalnum = totalnum
          totalmoney = totalmoney
        }
        let itemnownum = "items[" + ref +"].num"
         this.setData({
           [itemnownum] : nownum,
           'totalmoney' : totalmoney,
           'totalnum' : totalnum
         })
         let nowitems = this.data.items
         wx.setStorageSync("newgoods",nowitems)
         wx.setStorageSync("totalnum",totalnum)
      },
      bindReduceNum: function(e) {
        
        let ref = e.currentTarget.dataset.index
        let nowprice = this.data.items[ref].price
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum
        let itemnownum = "items[" + ref +"].num"
        let nownum = this.data.items[ref].num
        let items = this.data.items
        if (nownum> 1) {
          nownum -=1
          if (items[ref].checked == true) {
            totalmoney = totalmoney - nowprice
            totalnum -=1
          }else{
            totalnum = totalnum
            totalmoney = totalmoney
          }
        }else{
          nownum = 1
        }
        this.setData({
          [itemnownum]: nownum,
          'totalmoney' : totalmoney,
          'totalnum' : totalnum
        })
        let nowitems = this.data.items
        wx.setStorageSync("newgoods",nowitems)
        wx.setStorageSync("totalnum",totalnum)
      },
      checkboxChange: function(e) {
        // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        // console.log(e)
        let checkboxs = e.detail.value
        let checklen = checkboxs.length
        let itemlen = this.data.items.length
        if (itemlen == checklen) {
          this.setData({
            'isChecked': true
          })
        }else{
          this.setData({
            'isChecked': false
          })
        }
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum
        let items = this.data.items
        if (checkboxs.length == 0) {
          totalmoney = 0
          totalnum = 0
          for (let item = 0; item < items.length; item++) {
            items[item].checked = false
          }
        }else{
          totalmoney = 0
          totalnum = 0
          for (let item = 0; item < items.length; item++) {
            items[item].checked = false
          }
          for (let item = 0; item < checkboxs.length; item++) {
            let itemcheckbox = checkboxs[item]
            items[itemcheckbox].checked = true
            totalmoney += items[itemcheckbox].num * items[itemcheckbox].price
            totalnum += items[itemcheckbox].num
          }

        }

        this.setData({
          'totalmoney' : totalmoney,
          'totalnum' : totalnum
        })
        wx.setStorageSync("newgoods",items)
        wx.setStorageSync("totalnum",totalnum)
      },
      changAll: function(e){
        let items = this.data.items
        let isChecked = this.data.isChecked
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum

        for (let item = 0; item < items.length; item++) {
          let itemcheck = "items[" + item + "].checked"
            this.setData({
              [itemcheck] : ![itemcheck],
              'isChecked': !isChecked
            })
          if (items[item].checked == false && isChecked == false) {
            totalmoney += items[item].num * items[item].price
            totalnum += items[item].num
            this.setData({
            [itemcheck] : true,
            'isChecked': true,
            'totalmoney': totalmoney,
            'totalnum'  : totalnum
          })
          }else{
            this.setData({
              [itemcheck] : false,
              'isChecked' : false,
              'totalmoney': 0,
              'totalnum'  : 0
            })
          }
        }
        wx.setStorageSync("newgoods",items)
        wx.setStorageSync("totalnum",totalnum)
      },
      deleteItem: function (e) {
        let itemIndex = parseInt(e.currentTarget.dataset.index)
        let dataItems = this.data.items
        let totalmoney = this.data.totalmoney
        let totalnum = this.data.totalnum
        let isChecked =this.data.isChecked
        // dataItems = dataItems.splice(itemIndex,1)        
        dataItems.splice(itemIndex,1)
        this.setData({
          items: dataItems
        })
        if (dataItems.length == 0) {
          this.setData({
            'totalmoney': 0,
            'totalnum'  : 0
          })
        }else{
          totalmoney = 0
          totalnum = 0
          for (let item = 0; item < dataItems.length; item++) {
            if (dataItems[item].checked == true) {
              totalmoney += dataItems[item].num * dataItems[item].price
              totalnum += dataItems[item].num
            }
            if (dataItems[item].checked == false) {
              isChecked = false
            }
          }
          
          this.setData({
            'totalmoney' : totalmoney,
            'totalnum' : totalnum,
            'isChecked': isChecked
          })
        }
        wx.setStorageSync("newgoods",dataItems)
        wx.setStorageSync("totalnum",totalnum)
      },
      touchS: function(e) {
        if (e.touches.length == 1) {
          this.setData({
            startX:e.touches[0].clientX
          });
        }
  
      },
      touchM: function(e) {

      },
      touchE: function(e) {

          let endX = e.changedTouches[0].clientX
          let startX = this.data.startX
          let disX = startX - endX
          let delBtnWidth = this.data.delBtnWidth/3
          let itemIndex = e.currentTarget.dataset.index
          let itemleft = "items[" + itemIndex + "].left"
          if (disX > delBtnWidth) {
            this.setData({
              [itemleft]: '-180rpx'
            })
          }else{
            this.setData({
              [itemleft]: '0rpx'
            })
          }

      }
})