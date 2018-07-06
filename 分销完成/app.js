//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    
  },
  getUserInfo: function (cb) {
    var that = this
    var objuser;
    if (this.globalData.userInfo && this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.openid)
     
    }else{
      //调用登录接口
      wx.login({
        success: function (e) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              wx.request({
                url: that.globalData.url + '/team!getuserinfo.action',
                // data: e.detail.value,
               
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  code: e.code,
                  imgUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                  appid: that.globalData.appid,
                  appsecret: that.globalData.secret,
                  
                },
                method: 'POST', 
                success: function (res) {
                  console.log('team.openid:' + res.data.openid);
                  that.globalData.openid = res.data.openid
                  typeof cb == "function" && cb(that.globalData.userInfo, res.data.openid)
                },
                fail: function (res) {
                  console.log('submit fail');
                },
                complete: function (res) {
                  console.log('submit complete');
                }
              })
            }
          })

        }
      })
    }
  },
  globalData: {
    url:'https://fx.comeyang.com',
    appid: 'wxcf1f7ee4b4641a9c',//appid需自己提供，此处的appid我随机编写  
    secret:'aa488d068ba9fb57d40d37c9098ccd04',//secret需自己提供，此处的secret我随机编写 
    partner: '1488718912',//商户号
    partnerkey: 'LnFqv5I4LFGSDq3QjsNgUuI8x7jvs2Fo',//支付密钥
    title:'小程序商城',
    userInfo:null,
    openid:null,
  }
})
  