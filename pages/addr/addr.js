Page({
    data: {
        userRecive: [{userName: '',userPhone: '',userAddr: '',userDef: ''}],
    },
    onShow: function () {
       let Name = "userRecive[0].userName"
       let Phone = "userRecive[0].userPhone"
       let Addr = "userRecive[0].userAddr"
       let Def = "userRecive[0].userDef"
        this.setData({
            [Name] : "王先生",
            [Phone]: "17301755691",
            [Addr]: "上海市徐汇区徐家汇圣爱大厦2005上海市徐汇区徐家汇圣爱大厦2005",
            [Def]: "red"
        })
        console.log(this.data.userRecive)
    },
    newaddr: function () {
        wx.navigateTo({
            url: '/pages/newaddr/newaddr'
          })
    }
})