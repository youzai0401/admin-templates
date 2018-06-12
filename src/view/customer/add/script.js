import server from '../../../api/customer-manage/index';
import Page from '../../../component/page';
import customCard from '../../../component/custom-card';
import uploadImg from '../../../component/upload-img';
import Block from '../../../component/block';
import deepcopy from 'deepcopy';

export default {
    components: {
        Page,
        uploadImg,
        customCard,
        Block
    },
    data() {
        return {
            isLoad: false,
            id: this.$route.query.id,
            userInfo: {
                openid: this.$route.query.id,
                name: '',
                identityId: '',
                cardFront: [],
                cardBack: [],
                cardPerson: []
            },
            userData: {
                openid: this.$route.query.id,
                phoneNum: '',
                permanentAddr: '',
                houseType: '',
                houseAddr: '',
                maritalStatus: '',
                houseOwner: '',
                companyName: '',
                companyAddr: '',
                sector: '',
                position: '',
                companyPhone: '',
                jobAge: '',
                incomeMon: '',
                introducerName: '',
                introducerPhone: '',
                remark: ''
            },
            bankInfo: {
                openid: this.$route.query.id,
                name: '',
                identityId: '',
                bankAddr: '',
                account: ''
            },
            linkInfo: [{
                openid: this.$route.query.id,
                relation: '',
                name: '',
                phoneNum: '',
                company: ''
            }],
            debtInfo: [{
                openid: this.$route.query.id,
                name: '',
                value: '',
                useValue: '',
                type: ''
            }],
            // 表单验证配置
            userInfoRules: {
                name: [{required: true, message: '请输入姓名'}
                ], identityId: [
                    {required: true, message: '请输入身份证'}
                ], cardFront: [
                    {required: true, message: '请输入身份证人像面'}
                ], cardBack: [
                    {required: true, message: '请输入身份证背面'}
                ], cardPerson: [
                    {required: true, message: '请输入人和身份证合照'}
                ], phoneNum: [
                    {required: true, message: '请输入借款人手机号'}
                ], permanentAddr: [
                    {required: true, message: '请输入户籍所在地'}
                ], houseType: [
                    {required: true, message: '请输入住宅类型'}
                ], houseAddr: [
                    {required: true, message: '请输入住宅地址'}
                ], maritalStatus: [
                    {required: true, message: '请输入婚姻状况'}
                ], houseOwner: [
                    {required: true, message: '请输入户主名称'}
                ], companyName: [
                    {required: true, message: '请输入公司名称'}
                ], companyAddr: [
                    {required: true, message: '请输入公司地址'}
                ], sector: [
                    {required: true, message: '请输入所在部门'}
                ], position: [
                    {required: false, message: '请输入所在职位'}
                ], companyPhone: [
                    {required: false, message: '请输入公司电话'}
                ], jobAge: [
                    {required: false, message: '请输入工龄'}
                ], incomeMon: [
                    {required: false, message: '请输入月收入'}
                ], introducerName: [
                    {required: false, message: '请输入介绍人姓名'}
                ], introducerPhone: [
                    {required: false, message: '请输入介绍人电话'}
                ], remark: [
                    {required: false, message: '请输入备注'}
                ]
            },
            bankInfoRules: {
                name: [
                    {required: true, message: '请输入姓名'}
                ],
                identityId: [
                    {required: true, message: '请输入身份证'}
                ],
                bankAddr: [
                    {required: true, message: '请输入开户行地址'}
                ],
                account: [
                    {required: true, message: '请输入银行账号'}
                ]
            },
            linkInfoRules: {
                relation: [
                    {required: true, message: '请输入联系人关系'}
                ],
                name: [
                    {required: true, message: '请输入联系人姓名'}
                ],
                phoneNum: [
                    {required: true, message: '请输入联系人手机号'}
                ],
                company: [
                    {required: true, message: '请输入联系人单位'}
                ]
            },
            debtInfoRules: {
                name: [
                    {required: true, message: '请输入负债名称'}
                ],
                value: [
                    {required: true, message: '请输入额度'}
                ],
                useValue: [
                    {required: true, message: '请输入使用额度'}
                ],
                type: [
                    {required: true, message: '请算则类型'}
                ]
            }
        };
    },
    computed: {
        btnText() {
            return this.id ? '保存' : '保存';
        },
        title() {
            return this.id ? '编辑客户' : '创建客户';
        },
        header() {
            const editTitle = [
                {
                    title: '客户管理',
                    path: '/customer_list'
                }, {
                    title: '编辑客户'
                }];
            const addTitle = [
                {
                    title: '客户管理',
                    path: '/customer_list'
                }, {
                    title: '创建客户'
                }];
            return this.id ? editTitle : addTitle;
        }
    },
    created() {
        this.getUserInfo();
        this.getUserData();
        this.getBankInfo();
        this.getLinkInfo();
        this.getDebtInfo();
    },
    mounted() {
    },
    methods: {
        async handleSubmitForm() {
            console.log(this.$refs);
            const VALID_STATUS = [];
            for (const item in this.$refs) {
                if (this.$refs[item]) {
                    this.$refs[item].validate(valid => {
                        VALID_STATUS.push(valid);
                    });
                }
            }
            if (VALID_STATUS.indexOf(false) < 0) {
                const that = this;
                this.isLoad = true;
                const userInfo = deepcopy(this.userInfo);
                userInfo.cardBack = userInfo.cardBack[0].url;
                userInfo.cardFront = userInfo.cardFront[0].url;
                userInfo.cardPerson = userInfo.cardPerson[0].url;
                server.saveAll(userInfo, this.userData, this.bankInfo, this.linkInfo, this.debtInfo, (a, b, c, d, e) => {
                    console.log('all suc', a, b, c, d, e);
                    this.isLoad = false;
                    that.$alert('保存成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: () => {
                            this.$router.push({path: '/customer_list'});
                        }
                    });
                }).catch(() => {
                    this.$message({
                        message: '网络错误',
                        type: 'error'
                    });
                    this.isLoad = false;
                });
            } else {
                this.$message({
                    message: '请将表单填写完整',
                    type: 'error'
                });
            }
        },
        getParams() {
            if (this.id) {
                // this.formData.id = this.id;
            }
            // this.formData.area[0].ids = this.$refs.tree.getCheckedKeys(true);
            console.log(this.formData);
            // debugger
            // delete this.formData.imageList;
            return this.formData;
        },
        getUserInfo() {
            server.getUserInfo(this.id).then(res => {
                if (res.data.code === 200 && res.data.data) {
                    res.data.data.cardBack = [{url: res.data.data.cardBack}];
                    res.data.data.cardFront = [{url: res.data.data.cardFront}];
                    res.data.data.cardPerson = [{url: res.data.data.cardPerson}];
                    this.userInfo = res.data.data;
                }
            });
        },
        getUserData() {
            server.getUserData(this.id).then(res => {
                if (res.data.code === 200) {
                    if (res.data.data) {
                        this.userData = res.data.data;
                    }
                }
            });
        },
        getBankInfo() {
            server.getBankInfo(this.id).then(res => {
                if (res.data.code === 200) {
                    if (res.data.data) {
                        this.bankInfo = res.data.data;
                    }
                }
            });
        },
        getLinkInfo() {
            server.getLinkInfo(this.id).then(res => {
                if (res.data.code === 200) {
                    if (res.data.data && res.data.data.length !== 0) {
                        this.linkInfo = res.data.data;
                    }
                }
            });
        },
        getDebtInfo() {
            server.getDebtInfo(this.id).then(res => {
                if (res.data.code === 200) {
                    if (res.data.data && res.data.data.length !== 0) {
                        this.debtInfo = res.data.data;
                    }
                }
            });
        },
        handleBack() {
            this.$router.push({path: '/customer_list'});
        }
    }
};
