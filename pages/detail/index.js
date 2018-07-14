// pages/detail/index.js
import util from '../../utils/util';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,
    scrollHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let info = JSON.parse(options.item);
    let reg=/<[^>]+>/gim;
    info.content = info.content.replace(reg,"");
    this.setData({
      info,
      scrollHeight:app.globalData.useableHeight
    })
  }
})