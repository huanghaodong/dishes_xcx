//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util';
Page({
  data: {
    iptDisabled:true,
    value:''
  },
  onReady:function () {
    var res = wx.getSystemInfoSync()
    app.globalData.switchTabPageUseableHeight = res.windowHeight * (750 / res.windowWidth);
  },
  tapSearchBox:function () {
    if(!this.data.iptDisabled) return;
    this.setData({
      iptDisabled:false
    })
  },
  blur:function () {
    this.setData({
      iptDisabled:true
    })
  },
  search:function () {
    this._pushToSearchDishesList()
  },
  bindInput: function(e){
    this.data.value = e.detail.value;
  },
  _pushToSearchDishesList: function () {
    let value = this.data.value;
    wx.navigateTo({
      url: "/pages/searchDishesList/index?keyword="+value,
    })
  }
})
