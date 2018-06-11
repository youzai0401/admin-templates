import {fetch} from '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    // 申请贷款接口
    postApplyLoan(data) {
        return fetch().post(serviceUrl.postApplyLoan, data);
    },
    getList(data) {
        return fetch().get(serviceUrl.getListPath, {params: data});
    },
    editProduction(data) {
        return fetch().post(serviceUrl.editProductionPath(''), data);
    },
    getProduction(id) {
        return fetch().get(serviceUrl.editProductionPath(id));
    },
    deleteProduction(id) {
        return fetch().delete(serviceUrl.editProductionPath(id));
    }
};