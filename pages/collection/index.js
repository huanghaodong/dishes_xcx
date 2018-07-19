// pages/me/index.js
import util from '../../utils/util';
let app = getApp();
let editIndex = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    isEdit:false,
    showEditModal:false,
    value:'',
    focus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      list:this._getItem('collection')||[]
    })
  },
  toEdit:function () {
    this.setData({
      isEdit:true
    })
  },
  toCancle:function () {
    this.setData({
      isEdit:false
    })
  },
  deleteCollection:function(e){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除该收藏吗？',
      confirmColor: '#1296db',
      cancelColor: '#4E586E',
      success: function (res) {
        if (res.confirm) {
          let {index} = e.currentTarget.dataset;
          let tempArr = that.data.list;
          tempArr.splice(index,1);
          that._setItem('collection',tempArr);
          that.setData({
            list:tempArr
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  editCollection:function(e){
    editIndex = e.currentTarget.dataset.index;
    this.setData({
      showEditModal:true,
      value:this.data.list[editIndex].remark,
      focus:true
    })
  },
  hideEditCollection:function(){
    this.setData({
      showEditModal:false
    })
  },
  sure:function(){
    this.data.list[editIndex].remark = this.data.value;
    this._setItem('collection',this.data.list)
    this.setData({
      list:this.data.list,
      showEditModal:false
    })
  },
  input:function(e){
    this.setData({
      value:e.detail.value
    })
  },
  confirm:function(e){
    this.data.list[editIndex].remark = this.data.value;
    this._setItem('collection',this.data.list)
    this.setData({
      list:this.data.list,
      showEditModal:false
    })
  },
  pushToDetail:function(e){
    if(this.data.isEdit) return;
    let {index} = e.currentTarget.dataset;
    let str = util.objToParams({
      isFromCollection:true,
      id:this.data.list[index].id
    })
    wx.navigateTo({
      url: "/pages/detail/index?"+str,
    })
  },
  _setItem: function (item, data){
    typeof data != 'string' && JSON.stringify(data)
    wx.setStorageSync(item, data)
  },
  _getItem: function (item){
    let info = wx.getStorageSync(item)
    return info;
  },
  _removeItem: function(item){
    try {
      wx.removeStorageSync(item);
      return true;
    } catch (e) {
      return false;
    }
  },
})