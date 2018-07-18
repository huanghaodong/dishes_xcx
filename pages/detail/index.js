// pages/detail/index.js
import util from '../../utils/util';
const app = getApp();
let id = 0;
let collectionArr = [];
let collectionIndex = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,
    showSwiper:false,
    current:0,
    isError:false,
    hasCollecte:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isFromShare||options.isFromCollection){
      id = +options.id;
      this._getInfoById()
      this.setData({
        hasCollecte:this._judgmentCollectionById(options.id)
      })
    }else{
      let info = JSON.parse(options.item);
      let reg=/<[^>]+>/gim;
      info.content = info.content.replace(reg,"");
      this.setData({
        info,
        hasCollecte:this._judgmentCollectionById(info.id)
      })
    }

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
  },
  toggleCollection:function () {
    if(this.data.hasCollecte){
      collectionArr.splice(collectionIndex,1);
      this._setItem('collection',collectionArr);
      this.setData({
        hasCollecte:false
      })
      wx.showToast({
        title: '收藏已取消',
        icon:'none',
        duration: 1000
      })
    }else{
      collectionArr.unshift({
        id:this.data.info.id,
        name:this.data.info.name,
        pic:this.data.info.pic,
        remark:''
      });
      this._setItem('collection',collectionArr);
      this.setData({
        hasCollecte:true
      })
      wx.showToast({
        title: '收藏成功，<我的-我的收藏>中查看',
        icon:'none',
        duration: 1000
      })
    }
  },
  _judgmentCollectionById(id){
    let tempBool = false;
    collectionArr = this._getItem('collection')||[];
    for(let i=0,len=collectionArr.length;i<len;i++){
      if(collectionArr[i].id == id){
        collectionIndex = i;
        tempBool = true;
        break;
      }
    }
    return tempBool;
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