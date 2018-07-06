
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
  //上一个页面
Page({
  data: {
    region: ['请选择地址', '', ''],
    flag: 0,
    dizhi: {},
    customItem: '全部',
    modalHidden: true,
    isShowToast: false,
    province: '',
    city: '',
    qu: '',
    appid: appid,
    openid:''

  },
  onLoad: function (options) {
    
    var that = this  
    wx.request({
      url: url + '/dizhi!update.action?id=' + options.id,
      
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          dizhi: res.data,
          province: res.data.province,
          city: res.data.city,
          qu: res.data.qu,
          region:[res.data.province, res.data.city, res.data.qu]
        })
       
      }
    })
      //更新数据
      that.setData({
        openid: options.openid, 
      })
   
  },
  bindRegionChange: function (e) {
    console.log('radio发生change事件，携带detail值为：', e.detail.value)
    this.setData({
      region: e.detail.value,
      flag: 1,
      province: e.detail.value[0],
      city: e.detail.value[1],
      qu: e.detail.value[2],

    })
  },
  formBindsubmit: function (e) {
    var that = this;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var province = e.detail.value.province;
    var city = e.detail.value.city;
    var qu = e.detail.value.qu;
    var address = e.detail.value.address;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (name == '') {
      that.showToast("请填写姓名", that)
      return false;
    }
    if (phone == '') {
      that.showToast("请输入手机号码", that)
      return false;
    }
    if (!myreg.test(phone)) {
      that.showToast("手机号码有误", that)
      return false;
    }
    if (that.data.province == '' || that.data.city == '' || that.data.qu == '') {
      that.showToast("请选择省市区", that)
      return false;
    }
    if (address == '') {
      that.showToast("请填写详细地址", that)
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    console.log(e.detail.value);
    var formData = e.detail.value;   
    wx.request({
      url: url + '/dizhi!updatedizhi.action',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        prevPage.setData({
          dizhis: res.data
        })
        wx.hideLoading();
        wx.navigateBack({})
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
  queren: function () {
    this.modalTap();
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.formBindsubmit()
    this.setData({
      modalHidden: true,


    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.formBindsubmit()
    this.setData({
      modalHidden: true,


    });
  },
})
