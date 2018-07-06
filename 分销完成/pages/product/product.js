var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({
  data: {
    openid:'',
    imas:[],
    product:{},
    guiges:[],
    url1: app.globalData.url,
    baoshui:1,
    fahuotime: '1-3个工作日',
    guigeshow: true,
    guigenum: 1,
    guigename:'',
    guigenameid:null,
    kucun:'',
    kucun1:100,
    queren:1,
    add:null,
  },
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        openid: openid
      })
    })
    wx.request({
      url: url + '/product1!d.action?product1.id=' + options.id + '&appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('xiangqing:' + res.data.object.xiangqing);
        var article = res.data.object.xiangqing;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          imas: res.data.objs,
          product: res.data.object,
          guiges: res.data.objs2,
          kucun: res.data.objs2[0].kucun,
          baoshui: res.data.res
        });
        for (var i = 0; i < res.data.objs2.length; ++i) {
          if (res.data.objs2[i].kucun>0){
            that.setData({
              kucun1: res.data.objs2[i].kucun,
              guigenameid: res.data.objs2[i].id,
              guigename: res.data.objs2[i].name,
              currentTab: res.data.objs2[i].id,
            });
            break;
              }
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res){
        console.log('submit complete');
      }
    })

  },
  
  onChangeShowState: function (options) {
    var add = options.currentTarget.dataset.add;
    var that = this;
    that.setData({
      guigeshow: (!that.data.guigeshow),
      add:add,
    })
  }, 
  rudioChoose: function (options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    var bianma = options.currentTarget.dataset.bianma;
    var name = options.currentTarget.dataset.name;
    var kucun1 = options.currentTarget.dataset.kucun;
    console.log("kucun1" + kucun1)
    //设置当前样式
    that.setData({
      guigenameid: id,
      guigename: name,
      kucun: options.currentTarget.dataset.kucun,
      kucun1: kucun1,
      'currentTab':id,
      queren:1,
      guigenum: 1,
    })
  },
  addNum: function (options) {
    var that = this;
    var num = options.currentTarget.dataset.num;

    that.setData({
      guigenum: num + 1
    })
  },
  subNum: function (options) {
    var that = this;
    var num = options.currentTarget.dataset.num;
    that.setData({
      guigenum: num - 1
    })
  },
  addcart: function () {
  
    var that = this;
    console.log("addcart" + that.data.product)
    wx.request({
      url: url + '/cart!add.action?appid=' + appid + '&openid=' + that.data.openid+'&cart.pid=' + that.data.product.id + '&num=' + that.data.guigenum + '&guige.id=' + that.data.guigenameid,
      method: 'get',
      header: { 'Content-Type': 'application/json'},
      success: function (res) {
        console.log('==='+res.data);
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        that.setData({
          guigeshow: (!that.data.guigeshow),
         
        })
        
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
  addorder: function () {
    var that = this;
    console.log("addcart" + that.data.product)
    wx.request({
      url: url + '/order!add.action?appid=' + appid + '&openid=' + that.data.openid + '&product1.id=' + that.data.product.id + '&num=' + that.data.guigenum + '&guige.id=' + that.data.guigenameid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res){
        console.log('===' + res.data);
        if (res.data.res2=='要税'){
          wx.navigateTo({
            url: '../sfzheng/sfzheng?oid=' + res.data.res1
          }) 
        }else{
          wx.navigateTo({
          url: '../final/final?oid=' + res.data.res1
        })
      }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
  gohome: function(){
    wx.switchTab({
      url: '../index/index'
    });  
  },
  gocart: function(){
    wx.switchTab({
      url: '../cart/cart'
    });  
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.produt.title,
      path: 'pages/product/product',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})