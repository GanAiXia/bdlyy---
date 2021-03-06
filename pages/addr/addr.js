Page({
    data: {
        userRecive: [],
    },
    onLoad: function () { 

    },
    onShow: function () {
        let that = this

        var openId = wx.getStorageSync('openId')
        if (openId) {
            wx.request({
                url: "https://weixin.ganxia.xyz/admin/member/getAddr",
                data: {openid: openId},
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                   
                    that.setData({
                        userRecive: res.data
                    })
                    console.log(that.data.userRecive)
                }
            })
            // that.setData({
            //     [Name] : "王先生",
            //     [Phone]: "17301755691",
            //     [Addr]: "上海市徐汇区徐家汇圣爱大厦2005上海市徐汇区徐家汇圣爱大厦2005",
            //     [Def]: "red"
            // })            
        }
    },
    newaddr: function () {
        wx.navigateTo({
            url: '/pages/newaddr/newaddr'
          })
    },
    userDefchange:function (res) {
        var that = this
        var curindex = res.currentTarget.dataset.index
        var curlen = that.data.userRecive.length
        for (let index = 0; index < curlen; index++) {
            // that.data.userRecive[index].userDef = "false"
            var udf = 'userRecive[' + index + '].userDef'

            that.setData({
             [udf] : 'false'
            })

        }
        var udfd = 'userRecive[' + curindex + '].userDef'
        that.setData({
            [udfd] : 'true'
        })
        // that.data.userRecive[curindex].userDef = "true"
        var openId = wx.getStorageSync('openId')
        wx.request({
            url: 'https://weixin.ganxia.xyz/admin/member/userDefchange',
            data: {
                openId: openId,
                userDefIndex: curindex
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data.res)
            }
        })
    },
    delAddr: function (res) {
        var that = this
        var delIndex = res.currentTarget.dataset.index
        var openId = wx.getStorageSync('openId')
       
        wx.request({
            url: 'https://weixin.ganxia.xyz/admin/member/delAddr',
            data: {
                openId: openId,
                delIndex: delIndex
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.res == 1) {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000,
                      success: function () {
                       setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/addr/addr'
                        })
                       }, 1000)
                      }
                    })
                  }
                // console.log(res)
            }
        })
        // console.log(res.currentTarget.dataset.index)
    },
    editAddr: function (res) {
        var that = this
        var editIndex = res.currentTarget.dataset.index
        wx.redirectTo({
            url: '/pages/editaddr/editaddr?editIndex=' + editIndex
        })
    }
})