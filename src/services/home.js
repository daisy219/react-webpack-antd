import { AUTH_API_ROOT } from '../config/index';
import http from './index';

/** 获取课本 */
export async function get_textbooks(params) {
    const res = await http.get(AUTH_API_ROOT + '/textbook/get-user-books', {params: params});
    return res.data
}

/** 获取当前选择课本信息 */
export async function get_onebook(params) {
    const res = await http.get(AUTH_API_ROOT + '/textbook/select-one', {params: params});
    return res.data
}
