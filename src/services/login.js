import { AUTH_API_ROOT } from '../config/index';
import http from './index';

export function login_web(params) {
    const res = http.get(AUTH_API_ROOT + '/efficiencyLogin', {params: params})
    return res
}
