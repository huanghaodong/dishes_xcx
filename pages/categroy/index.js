// pages/categroy/index.js
import util from '../../utils/util';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    scrollHeight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scrollHeight:app.globalData.switchTabPageUseableHeight
    })
    this._getCategroy();

  },
  bindPickerChange: function (e) {
    let index = e.target.dataset.index;
    let value = +e.detail.value;
    let classId = this.data.list[index].list[value].classid;
    wx.navigateTo({
      url: "/pages/dishesList/index?classid="+classId,
    })
  },
  refresh:function(){
    this._getCategroy();
  },
  _getCategroy:function(){
    this.setData({
      list:null,
      isError:false
    })
    util.post('jisuapi/recipe_class',{},(data)=>{
      this.setData({
        list:data.result
      })
    },(msg)=>{
      this.setData({
        list:[],
        isError:true
      })})
  }
})