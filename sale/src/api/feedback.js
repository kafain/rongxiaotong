import { request } from '../utils/request'
// 增加反馈
export function addFeedback(params) {
    return request({
        method: 'post',
        url: `/Feedback/addFeedback/${params.advice}/${params.telephonenumber}`,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 根据用户名删除反馈信息
export function deleteFeedbackByUsername(params) {
    return request({
        method: 'delete',
        url: '/Feedback/deleteFeedback/' + params.user_name,
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

// 查询所有反馈信息
export function selectAllFeedback(params) {
    return request({
        method: 'get',
        url: '/Feedback/selectAllFeedback',
        headers: {
            'Authorization': window.localStorage.token,
        },
    })
}

