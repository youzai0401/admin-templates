import {fetch} from '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    // 申请列表接口
    getApplyList(data) {
        return fetch().get(serviceUrl.getApplyListPath, {params: data});
    },
    changeApplyStatus(id, status) {
        return fetch().put(serviceUrl.changeApplyStatusPath(id, status));
    },
    deleteApply(id) {
        return fetch().delete(serviceUrl.deleteApplyPath(id));
    }
};