/**
 * 设置cookie
 */
export function setCookie(name: string, value: string) {
  document.cookie = name + '=' + escape(value);
  // console.log(name,value)
}

/**
 * 读取Token
 */
export function Token() {
    const arr: any = [];
    const reg = new RegExp('(^| )platform_token=([^;]*)(;|$)'); // 正则匹配
    if ( arr === document.cookie.match(reg) ) {
      return unescape(arr[2]);
    } else {
      return null;
    }
}

/**
 * use_iframe_download function - 通过 iframe 下载文件
 *
 * @param  {String} download_path 需下载文件的链接
 * @return {Void}
 */
export const use_iframe_download = (download_path: string) => {
  const $iframe = document.createElement('iframe');

  $iframe.style.height = '0px';
  $iframe.style.width = '0px';
  document.body.appendChild($iframe);
  $iframe.setAttribute('src', download_path);

  setTimeout(() => { $iframe.remove(); }, 20000);
};

/**
 * useFormDownload function - 通过 form 下载文件
 *
 * @param  {String} method http method
 * @param  {String} action 后端接口
 * @param  {Object} params 请求参数
 * @return {Void}
 */
export function use_form_download(method: string, action: string, params: any) {

  // const _uuid = uuid();
  const inputs = Object.keys(params).map((key) => {
      return `<input type="hidden" name="${key}" value='${params[key]}'/>`;
  }).join('');

  const $form = document.createElement('form');

  $form.action = action;
  $form.method = method;
  // $form.target = _uuid;
  $form.innerHTML = inputs;

  document.body.appendChild($form);

  $form.submit();

  setTimeout(() => {
    $form.remove();
  }, 10000);
}

