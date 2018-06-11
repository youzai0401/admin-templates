export default {
    getApplyListPath: '/admin/apply',
    changeApplyStatusPath(id, status) {
        return `/admin/apply/${id}?status=${status}`;
    },
    deleteApplyPath(id) {
        return `/admin/apply/${id}`;
    }
};