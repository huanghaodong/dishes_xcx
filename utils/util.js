const Utils = {
  _typeof (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isString (o) { //是否字符串
    return Utils._typeof(obj) === 'string'
  },
  isNumber (o) { //是否数字
    return Utils._typeof(obj) === 'number'
  },
  isBoolean (o) { //是否boolean
    return Utils._typeof(obj) === 'boolean'
  },
  isFunction (o) { //是否函数
    return Utils._typeof(obj) === 'function'
  },
  isNull (o) { //是否为null
    return Utils._typeof(obj) === 'null'
  },
  isUndefined (o) { //是否undefined
    return Utils._typeof(obj) === 'undefined'
  },
  isArray (o) { //是否数组
    return Utils._typeof(obj) === 'array'
  },
  isDate (o) { //是否时间
    return Utils._typeof(obj) === 'date'
  },
  /*是否是纯粹的对象*/
  isPlainObject (obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString (obj) {
    return typeof (obj) === 'string';
  },
  /*是否是空数组*/
  isNonEmptyArray (obj = []) {
    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  /*是否是对象*/
  isObject (item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  },
  /*是否是空对象*/
  isEmptyObject (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont (text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    const regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  /*深拷贝*/
  mergeDeep (target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (const key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {
              [key]: {}
            });
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return Utils.mergeDeep(target, ...sources);
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk (arr = [], size = 4) {
    let groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map((e, i) => {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(e => {
        return e;
      });
    }
    return groups;
  },
  /*
   * 截断字符串
   * @param str 传入字符串
   * @param len 截断长度
   * @param hasDot 末尾是否...
   * @returns {String}
   */
  truncateString (str, len, hasDot = true) {
    let newLength = 0;
    let newStr = '';
    let singleChar = '';
    const chineseRegex = /[^\x00-\xff]/g;
    const strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },
  /*
   * 转换 obj 为 url params参数
   * @param obj 传入对象
   * @param isEncodeURIComponent 是否编码，默认不编码
   * @returns {String}
   * eg. objToParams({name:'大佬',age:18})
   */
  objToParams (obj,isEncodeURIComponent=false) {
    let str = "";
    for (let key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + (isEncodeURIComponent?encodeURIComponent(obj[key]):obj[key]);
    }
    return str;
  },
  /*
   * 转换 url params参数为obj
   * @param str 传入url参数字符串
   * @param isDecodeURI 是否解码，默认不解码
   * @returns {Object}
   * eg. paramsToObj('http://www.cctv.com?name=大佬&age=18')
   */
  paramsToObj (str,isDecodeURI=false) {
    let obj = {};
    str = str.substring(str.indexOf('?')+1);
    try {
      obj = JSON.parse('{"' + (isDecodeURI?decodeURI(str):str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    } catch (e) {
      console.log(e);
    }
    return obj;
  },
  /*
   *保留n位小数
   *@param num {Number|String} 原数字 1.33或者'1.33'
   *@returns {String} 返回字符串
   */
  toThousands(num,n) {
    return parseFloat(num).toFixed(n).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
  },
  /*
   *生成两位整数之间的随机整数(包括两端的整数 )
   *
   **/
  randomA(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  /*
   *生成两位整数之间的随机整数(不包括两端的整数)
   *
   **/
  randomB(min, max) {
    min+=1,max-=1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /*时间格式化*/
  formatTime(obj, format) {
    if(format){
      var date;
      if (obj instanceof Date) {
        date = obj;
      } else {
        date = new Date(obj);
      }
      var dayNames = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',]

      var o = {
        'M+': date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1), // 月份
        'd+': date.getDate() < 10 ? "0" + date.getDate() : date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S+': date.getMilliseconds(), // 毫秒
        'D+': dayNames[date.getDay()], //星期
      };

      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp(`(${k})`).test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
      }
      return format;
    }else{
      let date = new Date(obj)
      let _year = date.getFullYear(),
        _month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : '0' + (date.getMonth()+1),
        _date = date.getDate(),
        _hour = date.getHours(),
        _minute = date.getMinutes(),
        _second = date.getSeconds()
      return _year + '-' + _month + '-' + _date + ' ' + _hour + ':' + _minute + ':' + _second
    }
  },
  /*去掉首尾空格*/
  trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
  },
  /*正则匹配*/
  checkStr (str, type) {
    switch (type) {
      case 'phone':   //手机号码
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      case 'tel':     //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card':    //身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str)
      case 'postal':  //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ':      //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email':   //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money':   //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL':     //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'IP':      //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date':    //日期时间
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      case 'number':  //数字
        return /^[0-9]$/.test(str);
      case 'english': //英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': //中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower':   //小写
        return /^[a-z]+$/.test(str);
      case 'upper':   //大写
        return /^[A-Z]+$/.test(str);
      case 'HTML':    //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  },
  /**
   * @param  {s} 秒数
   * @return {String} 字符串
   *
   * @example formatHMS(3610) // -> 1h0m10s
   */
  formatHMS (s) {
    var str = ''
    if (s > 3600) {
      str = Math.floor(s/3600)+'h'+Math.floor(s%3600/60)+'m'+s%60+'s'
    }else if(s > 60) {
      str = Math.floor(s/60)+'m'+s%60+'s'
    }else{
      str = s%60+'s'
    }
    return str
  },
  /*数组删除指定元素*/
  remove (arr, ele) {
    var index = arr.indexOf(ele);
    if(index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },
  // 数组求并集
  union (a,b) {
    return [...new Set([...a, ...b])];
  },
  // 数组求交集
  intersect (a,b) {
    return [...new Set([...a].filter(x => b.includes(x)))];
  },
  //数组求差集
  difference (a,b) {
    return [...new Set([...a].filter(x => !b.includes(x)))];
  },
  //数组内部交换
  internalExchange (n,m,arr) {
    [arr[n],arr[m]] = [arr[m],arr[n]];
  } ,
  //数组去重
  Deduplication (arr) {
    return [...new Set([...arr])]
  },
  /*数组最大值*/
  max (arr) {
    return Math.max.apply(null, arr);
  },
  /*数组最小值*/
  min (arr) {
    return Math.min.apply(null, arr);
  },
  //字符串首字母变大写
  changeIndexToUpperCase(str){
    return str.replace(/\b\w+\b/g, function (word) {
      return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    });
  },

}

const _url_base = 'https://way.jd.com/';
const _appkey = 'db52dabf2d850010117ab87f8a93aa16';
function post(_url,_postData , successBack, errorBack, failBack){
  _postData.appkey = _appkey;
  wx.request({
    url: _url_base + _url,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    data: _postData,
    success: function (res) {
      if (res.data.code == '10000'){
        if (successBack){
          successBack(res.data.result)
        }
      }else {
        if (errorBack){
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 2000
          })
          errorBack(res.data.msg)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 2000
          })
        }
      }
    },
    fail: function (res){
      wx.showToast({
        title: '请求接口调用失败',
        icon:'none',
        duration: 2000
      })
    }
  })

}

module.exports = {
  post,
  ...Utils
};
