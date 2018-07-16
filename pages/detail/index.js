// pages/detail/index.js
import util from '../../utils/util';
const app = getApp();
let id = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,
    scrollHeight:0,
    showSwiper:false,
    current:0,
    isError:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isFromShare){
      id = +options.id;
      this._getInfoById()
    }else{
      let info = JSON.parse(options.item);
      let reg=/<[^>]+>/gim;
      info.content = info.content.replace(reg,"");
      this.setData({
        info,
      })
    }
    this.setData({
      scrollHeight:app.globalData.useableHeight
    })
  },
  _getInfoById:function(){
    this.setData({
      info:null,
      isError:false
    })
    util.post('jisuapi/detail',{
      id
    },(data)=>{
      if(data.status!=='0'){
        wx.showToast({
          title: data.msg,
          icon:'none',
          duration: 2000
        })
        this.setData({
          info:{},
          isError:true
        })
        return;
      }
      this.setData({
        info:data.result
      })
    },()=>{
      this.setData({
        info:{},
        isError:true
      })
    })
  },
  onShareAppMessage: function () {
    let path = this.route+'?'+util.objToParams({id:this.data.info.id,isFromShare:true});
    return {
      title: this.data.info.name +'——思思菜谱',
      path: path,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  refresh:function () {
    this._getInfoById();
  },
  preview:function (e) {
    this.setData({
      showSwiper:true,
      current:e.currentTarget.dataset.index
    })
    wx.setNavigationBarColor({
      frontColor:'#ffffff',
      backgroundColor:'#000000',
    })
  },
  closeSwiper:function () {
    this.setData({
      showSwiper:false
    })
    wx.setNavigationBarColor({
      frontColor:'#000000',
      backgroundColor:'#ffffff',
    })
  },
  swiperChange:function (e) {
   this.setData({
     current:e.detail.current
   })
  }
})