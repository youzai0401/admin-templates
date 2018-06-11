import server from '../../../api/product-manage/index';
import Page from '../../../component/page';
import customCard from '../../../component/custom-card';
import uploadImg from '../../../component/upload-img';
import {validators} from '../../../common/validators';

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
            formData: {
                name: '',
                rank: '',
                rate: '',
            },
            // 表单验证配置
            rules: {
                name: [
                    {required: true, message: '请输入名称'}
                ],
                rank: [
                    {type: 'number', required: true, message: '请输入数字'}
                ],
                rate: [
                    {required: true, message: '请输入利率'}
                ]
            }
        };
    },
    computed: {
        btnText() {
            return this.id ? '保存' : '保存';
        },
        title() {
            return this.id ? '编辑产品' : '创建产品';
        },
        header() {
            const editTitle = [
                {
                    title: '产品管理',
                    path: '/product_list'
                }, {
                    title: '编辑产品'
                }];
            const addTitle = [
                {
                    title: '产品管理',
                    path: '/product_list'
                }, {
                    title: '创建产品'
                }];
            return this.id ? editTitle : addTitle;
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
        getProduction() {
            server.getProduction(this.id).then(res => {
                console.log(res);
                this.formData = res.data.data;
            }).catch(err => {
                this.isLoad = false;
            });
        },
        async handleSubmitForm(formName) {
            let parentVaild;
            console.log(this.$refs[formName]);
            this.$refs[formName].validate(valid => {
                parentVaild = valid;
            });
            if (parentVaild) {
                // submit  do  something
                this.isLoad = true;
                if (this.id) {
                    const res = await server.editProduction(this.getParams()).catch(err => {
                        this.isLoad = false;
                    });
                    if (res.data.code === 200) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$router.push({path: '/product_list'});
                    }
                    this.isLoad = false;
                } else {
                    const res = await server.editProduction(this.getParams()).catch(err => {
                        this.isLoad = false;
                    });
                    if (res.data.code === 200) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.$router.push({path: '/product_list'});
                    } else {
                        // this.$message.error(res.data.message);
                        this.isLoad = false;
                    }
                    this.isLoad = false;
                }
            }
        },
        getParams() {
            if (this.id) {
                this.formData.id = this.id;
            }
            // this.formData.area[0].ids = this.$refs.tree.getCheckedKeys(true);
            console.log(this.formData);
            // debugger
            // delete this.formData.imageList;
            return this.formData;
        },
        handleBack() {
            this.$router.push({path: '/product_list'});
        }
    }
};
