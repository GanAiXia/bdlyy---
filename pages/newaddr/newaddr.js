Page({
 data: {
    region: [],
    customItem: '全部',
    shqs: '省、市、区、乡镇/街道：' ,
    userName: '',
    userPhone: '',
    addrDetail: '',
    userAddrDetail: '',
    encryptedData: '',
    iv: '',
    nickName:'',
    avatarUrl: '',
    gender: ''
  },
  onLoad: function() {
    // 查看是否授权
    var that = this
    var openId = (wx.getStorageSync('openId'))
    if (openId) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            gender: res.userInfo.gender
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {

      wx.showToast({
        title: '尚未登录，请先登录',
        icon: 'none',
        duration: 1500,
        complete: function () {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home'
            })
          }, 1500);
        }
      })
     
    }

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
   
  },
  getName: function (e) {
    // console.log(e.detail.value)  
    let that = this
    that.setData({
        userName: e.detail.value
    })
  },
  getPhone:function (e) {
    // console.log(e.detail.value)
    let that = this
    that.setData({
        userPhone: e.detail.value
    })
  },
  getDetail:function (e) {
    let that = this
    that.setData({
        addrDetail: e.detail.value
    })
    
  },
  addrsub: function () {
    let that = this  
    let region = that.data.region
    let userName = that.data.userName
    let userPhone = that.data.userPhone
    let addrDetail = that.data.addrDetail
    let userAddrDetail = that.data.userAddrDetail

    if (userName.length == 0) {
        wx.showToast({
            title: '用户名不能为空啊',
            icon: 'none',
            duration: 2000
        })
    }else if (userPhone.length == 0) {
        wx.showToast({
            title: '电话号码不能为空啊',
            icon: 'none',
            duration: 2000
          })
    }else if(region.length == 0){
    wx.showToast({
        title: '省市街道不能为空啊',
        icon: 'none',
        duration: 2000
      })
    }else if (addrDetail.length == 0) {
        wx.showToast({
            title: '详细地址不能为空啊',
            icon: 'none',
            duration: 2000
        })
    }else if (userPhone.length <11) {
        wx.showToast({
            title: '电话号码长度不对啊',
            icon: 'none',
            duration: 2000
          })
    }else if (userPhone.length == 11) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(userPhone)) {
            wx.showToast({
                title: '手机号好像输错了啊',
                icon: 'none',
                duration: 1500
            })
        }
    }

    if (addrDetail.length > 0) {
        userAddrDetail = region[0] + region[1] + region[2] + addrDetail
        console.log(userAddrDetail)
        that.setData({
            'userAddrDetail': userAddrDetail
        })
        console.log(this.data)
    }
    var openId = wx.getStorageSync('openId')
    wx.request({
      //后台接口地址
       url: 'https://weixin.ganxia.xyz/admin/member/memberAdd',
       data: {
        openId: openId,
        userName: that.data.userName,
        userPhone: that.data.userPhone,
        userAddrDetail: that.data.userAddrDetail,
        nickName:that.data.nickName,
        avatarUrl: that.data.avatarUrl,
        gender: that.data.gender
       },
       method: 'POST',
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         if (res.data.res == 1) {
           wx.showToast({
             title: '添加成功',
             icon: 'success',
             duration: 1000,
             success: function () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
              })
              }, 1000)
             }
           })
         }
         console.log(res)
       }
     })

  } 
})