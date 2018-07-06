//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1:app.globalData.url,
    currentTab: 0,
    wsyyhj:null,
    ysyyhj:null,
    ygqyhj: null,
    heigjt:0,
    
  },
  swichNav: function (e) {

    var that = this;
    
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }

  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: url + '/team!wsyyhj.action?team.openid=' + options.openid + '&appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        that.setData({
          wsyyhj: res.data.wsy,
          ysyyhj: res.data.ysy,
          ygqyhj: res.data.ygq,
          height: res.data.num*100,
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
 
  
})