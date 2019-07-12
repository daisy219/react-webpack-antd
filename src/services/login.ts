import { AUTH_API_ROOT } from '../config/index';
import { http_get } from './index';

export function login_web(params: EDU.LoginType): Promise<EDU.AjaxResponseType> {
    const res = http_get({api: AUTH_API_ROOT + '/efficiencyLogin', params: {params}});
    console.log(res);
    return res;
}
