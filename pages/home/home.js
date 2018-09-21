const app = getApp()
Page({
    data:{
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (this.data.canIUse){
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      },
      getUserInfo: function(e) {
        var that = this
        var openId = (wx.getStorageSync('openId'))
        if (openId) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              console.log(that.data.userInfo)
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
          wx.login({
            success: function (res) {
              console.log(res.code)
              
              if (res.code) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (res_user) {
                    that.setData({
                      userInfo: res_user.rawData,
                      hasUserInfo: true
                    })
                    // console.log(res_user)
                    wx.request({
                     //后台接口地址
                      url: 'https://weixin.ganxia.xyz/admin/member/memberCheck',
                      data: {
                        code: res.code,
                        encryptedData: res_user.encryptedData,
                        iv: res_user.iv
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        // this.globalData.userInfo = JSON.parse(res.data);
                        var usif= JSON.parse(res_user.rawData)
                        that.setData({
                          userInfo: usif,
                          hasUserInfo: true
                        })
                        wx.setStorageSync('openId', res.data.openid);
                        console.log(res)
                        console.log(that.data.userInfo)
                      }
                    })   
                  }, fail: function () {
                    wx.showModal({
                      title: '警告通知',
                      content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                      success: function (res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success: (res) => {
                              if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                wx.login({
                                  success: function (res_login) {
                                    if (res_login.code) {
                                      wx.getUserInfo({
                                        withCredentials: true,
                                        success: function (res_user) {
                                          wx.request({
                                           url: 'https://weixin.ganxia.xyz/admin/member/memberCheck',
                                            data: {
                                              code: res_login.code,
                                              encryptedData: res_user.encryptedData,
                                              iv: res_user.iv
                                            },
                                            method: 'POST',
                                            header: {
                                              'content-type': 'application/json'
                                            },
                                            success: function (res) {
                                              that.setData({
                                                nickName: res.data.nickName,
                                                avatarUrl: res.data.avatarUrl,
    
                                              })
                                              wx.setStorageSync('openId', res.data.openId);
                                            }
                                          })
                                        }
                                      })
                                    }
                                  }
                                });
                              }
                            }, fail: function (res) {
    
                            }
                          })
    
                        }
                      }
                    })
                  }, complete: function (res) {
    
    
                  }
                })
              }
            }
          })
    
        }
        
      },
      toAddr: function () {
        wx.navigateTo({
          url: '/pages/addr/addr'
        })
      }
})