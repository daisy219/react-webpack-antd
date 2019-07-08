import { COACH_API_ROOT } from '../config/index';
import http from './index';

/** 获取作业辅导列表 */
export async function get_coach_list(params) {
  const res = await http.get(COACH_API_ROOT + '/api/coach/list', {params: params});
  return res.data;
}
/** 新建作业辅导 */
export async function new_coach(params) {
  const res = await http.post(COACH_API_ROOT + '/api/coach/create', params);
  return res.data;
}