/**
 * 设置cookie
 */
export function setCookie(name,value) {
  document.cookie = name + '=' + escape(value);
  // console.log(name,value)
}

/**
 * 读取Token
 */
export function Token() {
    var arr,reg=new RegExp("(^| )platform_token=([^;]*)(;|$)"); //正则匹配
    if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
    }
    else{
      return null;
    }
}
