import { COACH_API_ROOT } from '@/api_root/main';
import { http_get, http_post } from './index';

/** 获取作业辅导列表 */
export async function get_coach_list(params: EDU.GetCoachListParamsType) {
  const res = await http_get({api: COACH_API_ROOT + '/api/coach/list', params: {params}});
  return res.data;
}

/** 新建作业辅导 */
export async function new_coach(params: EDU.NewCoachParamsType) {
  const res = await http_post({api: COACH_API_ROOT + '/api/coach/create', data: {params}});
  return res.data;
}
