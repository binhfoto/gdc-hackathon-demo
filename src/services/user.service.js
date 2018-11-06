import API from './api.service';
import get from 'lodash/get';

const CURRENT_USER_URL = 'gdc/account/profile/current';
const USER_LOGOUT_URL = 'gdc/account/login';

class UserService {

    userInfo = null;

    getCurrentUser() {
        return API.get(CURRENT_USER_URL)
            .then(data => {
                console.log(data);
                return this.userInfo = (data && data.accountSetting);
            });
    }

    getStatus() {
        if (this.userInfo) {
            return Promise.resolve(true);
        } else {
            return this.getCurrentUser()
                .then(() => !!this.userInfo);
        }
    }

    logout() {
        const profileId = get(this.userInfo, 'links.self', '').split('/').slice(-1);
        return API.delete(`${USER_LOGOUT_URL}/${profileId}`);
    }

    getFullName() {
        return `${this.userInfo.firstName} ${this.userInfo.lastName}`;
    }
}

export default new UserService();