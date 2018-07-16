// pages/dishesList/index.js
import util from '../../utils/util';
const app = getApp()
let keyword = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    scrollHeight:0,
    num:20,
    isError:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    keyword = options.keyword;
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
    this.setData({
      list:null,
      isError:false
    })
    util.post('jisuapi/search',{
      keyword:keyword+'',
      num:20
    },(data)=>{
      if(data.status!=='0'&&data.status!=='205'){
        wx.showToast({
          title: data.msg,
          icon:'none',
          duration: 2000
        })
        this.setData({
          list:[],
          isError:true
        })
        return;
      }
      if(data.status=='205'){
        wx.showToast({
          title: data.msg,
          icon:'none',
          duration: 2000
        })
        this.setData({
          list:[],
        })
        return;
      }
        data.result.list.forEach((v)=>{
              v.tag = v.tag.split(',');
        })
      this.setData({
        list:data.result.list
      })
    },(msg)=>{
        this.setData({
          list:[],
          isError:true
        })
    })
  },
  refresh:function () {
    this.getDishesListBySearch(keyword);
  }
})