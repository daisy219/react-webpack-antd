import { COACH_API_ROOT } from '../config/index';
import http from './index';

export async function get_coach_list(params) {
  const res = await http.get(COACH_API_ROOT + '/api/coach/list', {params: params});
  return res.data;
}