var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid

Page({
  data: {
    url1: app.globalData.url,
    quanxuan:true,
    logs: [],
    carts: [],
    allprice:0.0,
    openid:null,
    appid: app.globalData.appid,
    modalHidden:true,
    cartid:null,
    isShowToast: false,
    cartindex:null,
  },
  
  
  onShow: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        openid: openid
      })
      wx.request({
        url: url + '/cart!findall.action?openid=' + that.data.openid + '&appid=' + appid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('res1：' + res.data);
          that.setData({
            carts: res.data.objs,
            allprice: res.data.allprice,
            quanxuan: true,
          });
        },
        onShow: function () {
          this.onLoad();
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    })
  },
  
  checkboxChange: function (e) {
   
    var carts = this.data.carts, values = e.detail.value;
    console.log('选择：' + values);
    var price=0;
    var xuanzhong=true;
    
      
      for (var i = 0;i < carts.length; ++i) {
        carts[i].checked = false;
        for (var j = 0; j < values.length; ++j) {
          if (carts[i].id == values[j]) {
            carts[i].checked = true;
            break
          }
        }
      }
      for (var i = 0; i < carts.length; i++) {
        if (this.data.carts[i].checked) {
          price = this.data.carts[i].allprice + price
          
        }
        if (!(this.data.carts[i].checked)){
          xuanzhong=false;
        }
      }
      
      if (xuanzhong){
        this.setData({
          quanxuan:true
        });
      }else{
        this.setData({
          quanxuan: false
        });
      }
      this.setData({
        carts: carts,
        allprice: price.toFixed(2)
      });
  }, 
 
  quanxuan: function (e) {
    console.log('全选');
    var quanxuan = !this.data.quanxuan
    var price = 0;
    if (quanxuan){
      for (var i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].checked=true
        price = this.data.carts[i].allprice + price
      }
      
    }else{
      for (var i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].checked = false
      }
     
    }
    console.log('全选');
    this.setData({
      carts: this.data.carts,
      allprice: price.toFixed(2),
      quanxuan: quanxuan
    });
  } ,
  addNum: function (options) {
    var that = this;
    var id = options.currentTarget.id;
    var price = 0;
    console.log('id'+id);
    
    wx.request({
      url: url + '/cart!add2.action?cart.id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res){
        console.log('res：' + res.data.num);
        for (var i = 0; i < that.data.carts.length; i++) {
          if (id == that.data.carts[i].id) {
            console.log('jinlai');
            that.data.carts[i].num = res.data.num
            if (that.data.carts[i].baoshuiqu==1) {
              console.log('jinlai');
              that.data.carts[i].allprice = that.data.carts[i].shuihoujia * res.data.num
            }else{
              that.data.carts[i].allprice = that.data.carts[i].price1 * res.data.num
            }
          }
        }
        for (var i = 0; i < that.data.carts.length; i++) {
          if (that.data.carts[i].checked) {
            price = that.data.carts[i].allprice + price
          }
        }
        that.setData({
          carts: that.data.carts,
          allprice: price.toFixed(2)
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
  subNum: function (options) {
    var that = this;
    var id = options.currentTarget.id;
    var price = 0;
    console.log('id' + id);
    wx.request({
      url: url + '/cart!add3.action?cart.id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data.num);
        for (var i = 0; i < that.data.carts.length; i++) {
          if (id == that.data.carts[i].id) {
            that.data.carts[i].num = res.data.num
            if (that.data.carts[i].baoshuiqu == 1) {
              that.data.carts[i].allprice = that.data.carts[i].shuihoujia * res.data.num
            } else {
              that.data.carts[i].allprice = that.data.carts[i].price1 * res.data.num
            }
          }
        }
        for (var i = 0; i < that.data.carts.length; i++) {
          if (that.data.carts[i].checked) {
            price = that.data.carts[i].allprice + price
          }
          if (that.data.carts[i].buzu==1){
            if (that.data.carts[i].kucun >= that.data.carts[i].num){
              that.data.carts[i].buzu=0
            }
          }
        }
        that.setData({
          carts: that.data.carts,
          allprice: price.toFixed(2)
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
  shanchu: function (e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    console.log('id：' +id);
    console.log('index：' + index);
    var price = 0;
    wx.request({
      url: url + '/cart!delete.action?cart.id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        that.data.carts.splice(index, 1);
        for (var i = 0; i < that.data.carts.length; i++) {
          if (that.data.carts[i].checked) {
            price = that.data.carts[i].allprice + price
          }
        }
        that.setData({
          carts: that.data.carts,
          allprice: price.toFixed(2)
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
  formBindsubmit: function (e) {
    var opneid = e.detail.value.openid
    var appid = e.detail.value.appid
    var cartvalues = e.detail.value.cartvalues
    var checked=false;
    var buzu=false;
    var that = this;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].checked){
        checked=true;
        if (this.data.carts[i].buzu == 1) {
          buzu = true;
        }
      }
     
    } 
    if (buzu){
      that.showToast("您所购买的商品库存不足，请重新选择，或者减少购买数量", that)
      return false;
    }
    if (checked){
    wx.request({
      url: url + '/order!jiesuan.action?openid=' + opneid + '&appid=' + appid + '&cartvalues=' + cartvalues,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log('===' + res.data);
        if (res.data.res2 == '要税') {
          wx.navigateTo({
            url: '../sfzheng/sfzheng?oid=' + res.data.res1
          })
        } else {
          wx.navigateTo({
            url: '../final/final?oid=' + res.data.res1
          })
        }
      }
    })
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        showCancel:false,
        success: function (res){ 
        }
      })
    }
  },
  queren: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      cartid: id,
      cartindex: index
    })
    this.modalTap();
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    
    var that = this;
    that.setData({
      modalHidden: true,
    }); 
    var price = 0;
    wx.request({
      url: url + '/cart!delete.action?cart.id=' + that.data.cartid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.data.carts.splice(that.data.cartindex, 1);
        for (var i = 0; i < that.data.carts.length; i++) {
          if (that.data.carts[i].checked) {
            price = that.data.carts[i].allprice + price
          }
        }
        that.setData({
          carts: that.data.carts,
          allprice: price.toFixed(1)
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
  cancel_one: function (e) {
    console.log(e);
    
    this.setData({
      modalHidden: true,
    });
  },
  yanzheng: function(){
    var that = this;
    that.showToast("商品数量已经达到库存量", that)
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
})