var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({

  data: {
    isShowToast: false,
    tip: '',
    oid:'',
    radio1:true,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      oid: options.oid,
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this;
    that.setData({
      radio1: !that.data.radio1
    })
  },

  formBindsubmit: function (e) {
    var that = this;
    console.log("111" );
    var name = e.detail.value.name;
    var shen = e.detail.value.shen;
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (name == '') {
      that.showToast("请填写姓名", that)
      return false;
    }
    if (shen == '') {
      that.showToast("身份号不能为空", that)
      return false;
    }
    if (!pattern.test(shen)) {
      that.showToast("身份号格式有误", that)
      return false;
    }
    wx.request({
      url: url + '/order!updateshen.action',
      data:{
        name: name,
        shen: shen,
        oid:that.data.oid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("success:" + res.data);
        wx.navigateTo({
          url: '../final/final?oid=' + res.data
        })
      }
    })
    },
  showToast: function (text, that) {
    that.setData({
      tip: text,
      isShowToast: !that.data.isShowToast
    })
    setTimeout(function () {
      that.setData({
        isShowToast: !that.data.isShowToast
      });
    }, 1500);

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
  
  }
})