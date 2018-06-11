export default {
    changePasswordPath(data) {
        return `/admin/adminuser?username=${data.username}&oldpassword=${data.oldpassword}&newpassword=${data.newpassword}`;
    }
};