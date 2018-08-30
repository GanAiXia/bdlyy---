var WxSearch = require('../../wxSearch/wxSearch.js');
var app = getApp();
Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "眼鼻整形",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '脂肪管理',
            image: "../../skin/images/1.jpg"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "../../skin/images/2.jpg"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "脂肪管理",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "../../skin/images/1.jpg"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "../../skin/images/2.jpg"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "../../skin/images/3.jpg"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "面部管理",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "抗衰老",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 5,
        cate_name: "补水清洁",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 6,
        cate_name: "美白嫩肤",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 7,
        cate_name: "祛痘祛痣",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 8,
        cate_name: "韩式半永久",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      },
      {
        cate_id: 9,
        cate_name: "玻尿酸",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      }
      ,{
        cate_id: 10,
        cate_name: "肉毒素",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "../../skin/images/1.jpg"
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  "window":{
    "navigationBarTitleText": "商品列表页"
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['双眼皮','鼻整形','百达丽','眼综合','伯思立']);
    WxSearch.initMindKeys(['双眼皮','鼻整形','百达丽','眼综合']);
  },
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})