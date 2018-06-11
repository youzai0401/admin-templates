import server from '../../../api/password/index';
import customCard from '../../../component/custom-card';

export default {
    components: {
        customCard
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formData._newpassword !== '') {
                    this.$refs.formData.validateField('_newpassword');
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.newpassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isLoad: false,
            id: this.$route.query.id,
            formData: {
                username: '',
                oldpassword: '',
                newpassword: '',
                _newpassword: ''
            },
            // 表单验证配置
            rules: {
                username: [
                    {required: true, message: '请输入名称'}
                ],
                oldpassword: [
                    {required: true, message: '请输入旧密码'}
                ],
                newpassword: [
                    {validator: validatePass}
                ],
                _newpassword: [
                    {validator: validatePass2}
                ]
            }
        };
    },
    computed: {
        btnText() {
            return this.id ? '保存' : '保存';
        }
    },
    async created() {
        if (this.id) {
            this.getProduction();
        }
    },
    mounted() {
    },
    methods: {
        async handleSubmitForm(formName) {
            let parentVaild;
            console.log(this.$refs[formName]);
            this.$refs[formName].validate(valid => {
                parentVaild = valid;
            });
            if (parentVaild) {
                // submit  do  something
                this.isLoad = true;

                const res = await server.changePassword(this.getParams()).catch(() => {
                    this.isLoad = false;
                });
                if (res.data.code === 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.clearAllCookie();
                    this.$router.push({path: '/login'});
                } else {
                    // this.$message.error(res.data.message);
                    this.isLoad = false;
                }
                this.isLoad = false;
            }
        },
        getParams() {
            if (this.id) {
                this.formData.id = this.id;
            }
            // this.formData.area[0].ids = this.$refs.tree.getCheckedKeys(true);
            console.log(this.formData);
            // debugger
            // delete this.formData._newpassword;
            return this.formData;
        },
        handleBack() {
            this.$router.go(-1);
        },
        clearAllCookie() {
            const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (let i = keys.length; i--;) {
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
                }
            }
        }
    }
};
