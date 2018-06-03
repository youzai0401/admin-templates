import server from '../../../api/customer-manage/resource-level-add';
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
            pageLoad: false,
            isFirst: true,
            detailData: {},
            id: this.$route.query.id,
            treeData: [],
            defaultProps: {
                children: 'subSimpleNodeList',
                label: 'name'
            },
            channelItems: [],
            resourceItems: [],
            originalRespondData: [],
            nicheGroup: [],
            uploadImagesLength: 0,
            formData: {
                status: 2,
                type: '',
                channelId: '',
                rootId: '',
                // area: [{
                //     rootId: '',
                //     ids: []
                // }],
                name: '',
                nicheUrl: '',
                imageList: [],
                defaultUrl: '',
                createTime: '',
                nicheGroupId: '',
                creatorId: ''
            },
            // 表单验证配置
            rules: {
                type: [
                    {required: true, message: '请选择资源位类型'}
                ],
                channelId: [
                    {required: true, message: '请选择设备来源'}
                ],
                rootId: [
                    {required: true, message: '请选择设备来源下的平台'}
                ],
                name: [
                    {required: true, message: '请输入资源位名称'},
                    {validator: validators.validateCharacterLength()}
                ],
                nicheUrl: [
                    {required: true, message: '请输入呈现位访问编号'}
                    // {validator: validators.validateIsUrl()}
                ],
                imageList: [
                    {required: true, message: '请上传图片'}
                ],
                defaultUrl: [
                    {required: true, message: '请填写默认活动url'},
                    {validator: validators.validateIsUrl()}
                ],
                'area[0].ids': [
                    {required: true, message: '请勾选支持的设备来源'}
                ],
                nicheGroupId: [
                    {required: true, message: '请选择资源位集合'}
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
        },
        resourceLevelStr() {
            let resourceLevelStr = '';
            switch (parseInt(this.formData.type, 10)) {
                case 1:
                    resourceLevelStr = '普通呈现位';
                    break;
                case 2:
                    resourceLevelStr = '视频呈现位';
                    break;
                case 3:
                    resourceLevelStr = 'push呈现位';
                    break;
            }
            return resourceLevelStr;
        }
    },
    async created() {

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
                if (this.id) {
                    const res = await server.editResourceLevel(this.getParams()).catch(err => {
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
                    const res = await server.addResourceLevel(this.getParams()).catch(err => {
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
