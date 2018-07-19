// pages/dishesList/index.js
import util from '../../utils/util';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    classid:'',
    start:0,
    num:20,
    hasMore:true,
    isError:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {classid} = options;
    this.data.classid = +classid;
    this.getDishesByClassId();
  },

  pushToDetail: function (e) {
    let item = e.currentTarget.dataset.item;
    let str = JSON.stringify(item)
    wx.navigateTo({
      url: "/pages/detail/index?item="+str,
    })
  },
  loadMore: function(){
    let {hasMore} = this.data;
    if(!hasMore) return;
    this.data.start+=20;
    this.getDishesByClassId();
  },
  //根据分类id获取菜品列表
  getDishesByClassId:function () {
    let {classid,start,num} = this.data;
    util.post('jisuapi/byclass',{
      classid,
      start,
      num
    },(data)=>{
      if(data.status!=='0'){
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
      if(+data.result.num<20){
        this.data.hasMore = false;
      }
      data.result.list.forEach((v)=>{
        v.tag = v.tag.split(',');
      })
      let temArr = this.data.list == null?[]:this.data.list;
      let arr = this.data.start == 0  ? data.result.list : temArr.concat(data.result.list);
      this.setData({
        list:arr
      })
    },(msg)=>{
      this.setData({
        list:[],
        isError:true
      })
    })
  },
  refresh:function () {
    this.getDishesByClassId();
  }
})