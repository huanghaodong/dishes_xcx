//app.js
App({
  onLaunch: function () {
    this._getUserInfo()
  },
  _getUserInfo: function() {
    var that = this;
    that._checkUserInfoAuthority(function(){
      wx.getUserInfo({
        withCredentials:true,
        success: function(res) {
          console.log(res)
          that.globalData.userInfo = res.userInfo;
        },
        fail: function () {
          wx.showModal({
            title: '是否要打开设置页面重新授权',
            confirmText: '去设置',
            confirmColor: '#fc345c',
            content: '需要获取您的公开信息(昵称、头像等),请到小程序的设置中打开用户信息授权',
            success: function(res) {
              if (res.confirm) {
                wx.openSetting({
                  success:function(res){
                    if (res.authSetting["scope.userInfo"]) {
                      that.globalData.userInfo = res.userInfo;
                    }
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    },function(){
      wx.showModal({
        title: '是否去获取用户信息授权',
        confirmText: '去获取',
        confirmColor: '#fc345c',
        content: '需要获取您的公开信息(昵称、头像等)',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/getUserInfoAuthority/index'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    })


  },
  _checkUserInfoAuthority:function (successCb,failCb){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          typeof successCb == "function" && successCb();
        }else{
          typeof failCb == "function" && failCb();
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    useableHeight:0,
    switchTabPageUseableHeight:0
  }
})