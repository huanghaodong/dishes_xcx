// pages/dishesList/index.js
import util from '../../utils/util';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    scrollHeight:0,
    num:20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {keyword} = options;
    this.getDishesListBySearch(keyword);
  },
  onReady:function () {
    var res = wx.getSystemInfoSync()
    app.globalData.useableHeight = res.windowHeight * (750 / res.windowWidth);
    this.setData({
      scrollHeight:app.globalData.useableHeight
    })
  },
  pushToDetail: function (e) {
    let item = e.currentTarget.dataset.item;
    let str = JSON.stringify(item)
    wx.navigateTo({
      url: "/pages/detail/index?item="+str,
    })
  },
  getDishesListBySearch: function (keyword) {
    util.post('jisuapi/search',{
      keyword:keyword+'',
      num:20
    },(data)=>{
      this.setData({
        list:data.result.list
      })
    })
  }
})