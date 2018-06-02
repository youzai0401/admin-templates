import {fetch} from '../../common/request';
import common from '../../common/common';

export default {
    data() {
        return {
            disable: true,
            image: {},
            logining: false,
            getCodePath: '/pyramid/user/authcode',
            formData: {
                loginName: '',
                password: '',
                authCode: '',
                rememberMe: false
            },
            // 验证规则
            rules: {
                loginName: [
                    {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                authCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        };
    },
    mounted() {
        this.handleReloadCode();
        $(document).keydown(event => {
            if (event.keyCode === 13) {
                this.handleSubmit();
            }
        });
    },
    methods: {
        handleSubmit() {
            if (this.disable) return false;
            console.log(33);
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.logining = true;
                    this.login();
                }
            });
        },
        handleReloadCode() {
            const date = Date.parse(new Date());
            this.getCodePath = `${this.getCodePath}?date=${date}`;
        },
        async login() {
            const res = await fetch().post('/pyramid/user/login', this.formData).catch(() => {
                this.handleReloadCode();
                this.logining = false;
            });
            this.logining = false;
            if (res.data.code === 200) {
                common.store.clear();
                common.store.setUser(res.data.data);
                this.$router.push('/');
            }
            this.handleReloadCode();
        },
        validateBtn() {
            if (this.formData.loginName && this.formData.password && this.formData.authCode) {
                this.disable = false;
            } else {
                this.disable = true;
            }
        }
    }
};
