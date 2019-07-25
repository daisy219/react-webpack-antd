import { AUTH_API_ROOT, HOMEWORK_API_ROOT } from '@/api_root/main';
import { http_get, http_post } from './index';

/** 获取课本 */
export async function get_textbooks(params: EDU.TextbookParamsType) {
    const res = await http_get({api: AUTH_API_ROOT + '/textbook/get-user-books', params: {params}});
    return res.data;
}

/** 获取当前选择课本信息 */
export async function get_onebook(params: EDU.OnlyBookParamsType) {
    const res = await http_get({api: AUTH_API_ROOT + '/textbook/select-one', params: {params}});
    return res.data;
}

/** 获取当前选择章节节点 */
export async function get_child_node(params: EDU.GetChildNodeParamsType) {
    const res = await http_get({api: AUTH_API_ROOT + '/resourcenode/get-child-node', params: {params}});
    return res.data;
}

/** 获取科目信息 */
export async function get_subject() {
    const res = await http_get({api: AUTH_API_ROOT + '/schoolsubject/get-list'});
    return res.data;
}

/** 获取首页综合报表 */
export async function get_report(params: EDU.GetHomeReportParamsType) {
    const res = await http_get({api: HOMEWORK_API_ROOT + '/api/calculate-analysis/comprehensive-report', params: {params} || {}});
    return res.data;
}

/** 导出首页综合报表 */
export async function export_report() {
    const url = HOMEWORK_API_ROOT + '/api/calculate-analysis/export-comprehensive-report-e';
    return url;
}

/** 获取班级信息 */
export async function get_teach_class(params: EDU.OnlyBookParamsType) {
    const res = await http_get({api: AUTH_API_ROOT + '/teacherclass/get-class-list', params: {params} || {}});
    return res.data;
}

/** 获取指定班级学生 */
export async function get_student(classid: number) {
    const res = await http_post({api: AUTH_API_ROOT + '/class/get-class-stu', data: {classid} || {}, format: 'form_data'});
    return res.data;
}
