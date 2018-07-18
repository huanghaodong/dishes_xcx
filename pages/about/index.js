// pages/me/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info:app.globalData.userInfo
    })
  },
  pushToCollection: function () {
    wx.navigateTo({
      url: "/pages/collection/index",
    })
  }
})