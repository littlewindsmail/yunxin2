//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var opid=""
Page({
data:{
  url1: app.globalData.url,
  tip:'',
  dizhis:[],
  userInfo:{},
  openid:null,
  oid:'',
  onmsg:false,
  modalHidden: true,
  dizhiid:0,
},


/**
   * 生命周期函数--监听页面加载
   */
onLoad: function (options) {
  var that = this
  console.log("oid:" + options.oid + ':' + options.onmsg);
  that.setData({
    oid: options.oid,
    onmsg: options.onmsg
  });
  wx.showLoading({
    title: '加载中....',
    mask: true,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
 
    console.log("zhixcing");
  
    app.getUserInfo(function (userInfo, openid) {
      console.log("openid:" + openid);
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
      opid = openid;
      wx.request({
        url: url + '/dizhi!findall.action?openid=' + opid + '&appid=' + appid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('res：' + res.data);
          that.setData({
            dizhis: res.data,
            openid: options.openid
          });
        }
      })
    })
  
  wx.hideLoading();
},
  radioChange: function (e) {
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  var that = this
  var id = e.detail.value;
  console.log('radio发生change事件，携带value值为：'+e.detail.value)
  wx.request({
    url: url + '/dizhi!updatamoren.action?openid=' + opid + '&appid=' + appid + '&id=' + e.detail.value,
    method: 'get',
    header: { 'Content-Type': 'application/json'},
    success: function (res) {
      console.log('res：' + res.data);
      that.setData({
        dizhis: res.data,
      });
      wx.hideLoading();
    }
  })
},
  shanchu: function (e) {
    var id = e.currentTarget.id;
    var that = this
    wx.request({
      url: url + '/dizhi!delete.action?openid=' + opid + '&appid=' + appid + '&id=' +id,
      method: 'get',
      header: {'Content-Type': 'application/json'},
      success: function (res) {
        console.log('res：' + res.data);
        that.setData({
          dizhis: res.data,
        });
      }
    })
    },
  genggai: function (e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];//上局页面
    var that = this
    var id = e.currentTarget.id;
    console.log('更改：' + id);
    wx.request({
      url: url + '/order!updatedizhi.action?oid=' + that.data.oid + '&did=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        prevPage.setData({
          order: res.data.object,
          order1s: res.data.objs,
        })
        wx.navigateBack({})
      }
    })
    },

  queren: function (e) {
    this.modalTap();
    var that = this;
    var id = e.currentTarget.id;
    that.setData({
      dizhiid: id
    })

  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    var that = this
    console.log(e);
    var id = e.currentTarget.dataset.id;
    that.setData({
      modalHidden: true,
    });
    wx.request({
      url: url + '/dizhi!delete.action?openid=' + opid + '&appid=' + appid + '&id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        that.setData({
          dizhis: res.data,
        });
      }
    })
  },
  cancel_one: function (e) {
    console.log(e);
    
    this.setData({
      modalHidden: true,
    });
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function (){

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

}
})