//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util';
Page({
  data: {
    iptDisabled:true,
    value:'',
    historyRecord:null,
    showHistory:false
  },
  onShow:function () {
    let data = this._getItem('searchRecord')
    this.setData({
        historyRecord: data,
    })
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
    if(value.trim()=='') return;
    let recordList = [];
    this._getItem('searchRecord') && (recordList = this._getItem('searchRecord'));
    for(let i=0,len=recordList.length;i<len;i++){
      if(recordList[i] == value){
        recordList.splice(i,1);
        break;
      }
    }
    recordList.unshift(value);
    if (recordList.length > 10) {
        recordList.splice(10, recordList.length - 10);
    }
    this._setItem('searchRecord', recordList)
    wx.navigateTo({
      url: "/pages/searchDishesList/index?keyword="+value,
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
  tapSearchItem:function (e) {
      this.data.value = e.currentTarget.dataset.value;
      this._pushToSearchDishesList()
  },
  tapDelete:function (e) {
      let {value,index} = e.currentTarget.dataset;
      this.data.historyRecord.splice(index, 1);
      this.setData({
          historyRecord:this.data.historyRecord
      })
      let recordList = this._getItem('searchRecord')
      for(let i=0,len=recordList.length;i<len;i++){
        if(recordList[i] == value){
          recordList.splice(i, 1);
          break;
        }
      }
      this._setItem('searchRecord', recordList)
  },
  tapDeleteAll:function () {
    let that = this;
    wx.showModal({
        title: '提示',
        content: '确定清空所有搜索记录?',
        confirmColor: '#1296db',
        cancelColor: '#4E586E',
        success: function (res) {
            if (res.confirm) {
                that._removeItem('searchRecord')
                that.setData({
                    historyRecord: [],
                })
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
  },
  toggleHistoryBox:function () {
    this.setData({
      showHistory:!this.data.showHistory
    })
  }
})
