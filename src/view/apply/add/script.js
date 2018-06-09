import server from '../../../api/customer-manage/index';
import Page from '../../../component/page';
import customCard from '../../../component/custom-card';
import uploadImg from '../../../component/upload-img';

export default {
    components: {
        Page,
        uploadImg,
        customCard
    },
    data() {
        return {
            isLoad: false,
            id: this.$route.query.id,
            userInfo: {
                name: '',
                identityId: '',
                cardFront: [],
                cardBack: [],
                cardPerson: [],
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
                name: '',
                identityId: '',
                bankAddr: '',
                account: '',
            },
            linkInfo: {
                relation: '',
                name: '',
                phoneNum: '',
                company: ''
            },
            debtInfo: {
                name: '',
                value: '',
                useValue: '',
                type: ''
            },
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
                    {required: true, message: '请输入所在职位'}
                ], companyPhone: [
                    {required: true, message: '请输入公司电话'}
                ], jobAge: [
                    {required: true, message: '请输入工龄'}
                ], incomeMon: [
                    {required: true, message: '请输入月收入'}
                ], introducerName: [
                    {required: true, message: '请输入介绍人姓名'}
                ], introducerPhone: [
                    {required: true, message: '请输入介绍人电话'}
                ], remark: [
                    {required: true, message: '请输入备注'}
                ],
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
        // this.getUserInfo();
        // this.getBankInfo();
        // this.getLinkInfo();
        // this.getDebtInfo();
    },
    mounted() {
    },
    methods: {
        async handleSubmitForm() {
            console.log(this.$refs.length);
            const VALID_STATUS = [];
            for (const item in this.$refs) {
                console.log(item);
                this.$refs[item].validate(valid => {
                    VALID_STATUS.push(valid);
                });
            }
            if (VALID_STATUS.indexOf(false) < 0) {
                this.isLoad = true;
                if (this.id) {
                    this.$router.push({path: '/customer_list'});
                    this.isLoad = false;
                } else {
                    this.$router.push({path: '/customer_list'});
                    this.isLoad = false;
                }
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
            server.getUserInfo(this.id);
        },
        getBankInfo() {
            server.getBankInfo(this.id);
        },
        getLinkInfo() {
            server.getLinkInfo(this.id);
        },
        getDebtInfo() {
            server.getDebtInfo(this.id);
        },
        handleBack() {
            this.$router.push({path: '/customer_list'});
        }
    }
};
