import { HOMEWORK_API_ROOT } from '@/api_root/main';
import { http_get, http_post } from './index';

/** 获取网络作业列表 */
export async function get_work_list(params: EDU.GetCoachListParamsType) {
  const res = await http_get({api: HOMEWORK_API_ROOT + '/api/action/list', params: {params}});
  return res.data;
}
