
import {fetch} from '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    // 申请贷款接口
    postApplyLoan(data) {
        return fetch().post(serviceUrl.postApplyLoan, data);
    }
};