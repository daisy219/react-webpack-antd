import { AUTH_API_ROOT } from '../config/index';
import http from './index';

export function get_textbooks(params) {
    const res = http.get(AUTH_API_ROOT + '/textbook/get-user-books', {params: params})
    return res
}
