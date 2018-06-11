import {fetch} from '../../common/request';
import serviceUrl from './serviceUrl';

export default {
    changePassword(data) {
        console.log('data', data);
        return fetch().put(serviceUrl.changePasswordPath(data));
    }
};