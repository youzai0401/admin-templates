export default {
    getApplyListPath: '/admin/apply',
    changeApplyStatusPath(id) {
        return `/admin/apply/${id}`;
    },
    deleteApplyPath(id) {
        return `/admin/apply/${id}`;
    }
};