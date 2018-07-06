
//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid


Page({
  data: {
    url1: app.globalData.url,
    motto: 'Hello ',
    appid: '',
    userInfo: {},
    openid: null,
    admin:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
    })
    wx.request({
      url: url + '/team!getadmin.action?appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {

        that.setData({
          admin: res.data
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.admin.kfphone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '个人中心',
      path: 'pages/team/team',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  
})