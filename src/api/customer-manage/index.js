import {fetch} from '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    // 用户列表接口
    getUserList(data) {
        return fetch().get(serviceUrl.getUserListPath, data);
    },
    // 身份信息
    getUserInfo(id) {
        return fetch().get(serviceUrl.getUserInfoPath, {params: {openid: id}});
    },
    // 资料信息
    getUserData(id) {
        return fetch().get(serviceUrl.getUserDataPath, {params: {openid: id}});
    },
    // 银行信息
    getBankInfo(id) {
        return fetch().get(serviceUrl.getBankInfoPath, {params: {openid: id}});
    },
    // 联系人信息
    getLinkInfo(id) {
        return fetch().get(serviceUrl.getLinkInfoPath, {params: {openid: id}});
    },
    // 负债信息
    getDebtInfo(id) {
        return fetch().get(serviceUrl.getDebtInfoPath, {params: {openid: id}});
    },
    saveAll(a, b, c, d, e, cb) {
        function saveUserInfo() {
            return fetch().post(serviceUrl.getUserInfoPath, a);
        }

        function saveUserData() {
            return fetch().post(serviceUrl.getUserDataPath, b);
        }

        function saveBankInfo() {
            // return fetch().get(serviceUrl.getBankInfoPath, {params: {openid: 'admin123'}});
            return fetch().post(serviceUrl.getBankInfoPath, c);
        }

        function saveLinkInfo() {
            return fetch().post(serviceUrl.getLinkInfoPath, d);
        }

        function saveDebtInfo() {
            return fetch().post(serviceUrl.getDebtInfoPath, e);
        }

        return fetch().all([saveUserInfo(), saveUserData(), saveBankInfo(), saveLinkInfo(), saveDebtInfo()]).then(fetch().spread(cb));
    }

};