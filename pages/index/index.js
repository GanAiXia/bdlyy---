//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '上海百达丽医疗美容门诊部',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://www.bdlyy.com/skin/images/banner01.jpg',
      'http://www.bdlyy.com/skin/images/banner02.jpg',
      'http://www.bdlyy.com/skin/images/banner03.jpg'
    ],
    recommend: [
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题1',price: 1.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题2',price: 2.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题3',price: 3.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题4',price: 4.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题5',price: 5.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题6',price: 6.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题7',price: 7.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题8',price: 8.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题9',price: 9.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题10',price: 10.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题11',price: 11.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题12',price: 12.88}
    ],
    hotrec: [
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题1',price: 1.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题2',price: 2.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题3',price: 3.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题4',price: 4.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题5',price: 5.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题6',price: 6.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题7',price: 7.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题8',price: 8.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题9',price: 9.88},
      {url: 'http://www.bdlyy.com/skin/images/banner01.jpg',title: '推荐产品标题10',price: 10.88},
      {url: 'http://www.bdlyy.com/skin/images/banner02.jpg',title: '推荐产品标题11',price: 11.88},
      {url: 'http://www.bdlyy.com/skin/images/banner03.jpg',title: '推荐产品标题12',price: 12.88}
    ],
    circular: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    displayMultipleItems: 3
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
