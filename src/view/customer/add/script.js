import server from '../../../api/resource-level-manager/resource-level-add';
// import resourceLevelDisplayServer from '../../../api/resource-level-display-manager/resource-level-display-list';
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
            // treeData: [{
            //     id: 1,
            //     label: '全部',
            //     children: [{
            //         id: 3,
            //         label: '联想',
            //         children: [{
            //             id: 4,
            //             label: '55i2'
            //         }, {
            //             id: 5,
            //             label: 'S9'
            //         }, {
            //             id: 6,
            //             label: 'S32'
            //         }]
            //     }, {
            //         id: 7,
            //         label: '夏普',
            //         children: [{
            //             id: 8,
            //             label: 'U1'
            //         }, {
            //             id: 9,
            //             label: 'S1'
            //         }]
            //     }, {
            //         id: 10,
            //         label: '17TV',
            //         children: [{
            //             id: 11,
            //             label: '65I3'
            //         }, {
            //             id: 12,
            //             label: '55I2'
            //         }]
            //     }]
            // }],
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
                    {required: true, message: '请输入呈现位访问编号'},
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
            },
        };
    },
    computed: {
        btnText() {
            return this.id ? '保存' : '保存';
        },
        title() {
            return this.id ? '编辑呈现位' : '创建呈现位';
        },
        header() {
            const editTitle = [
                {
                    title: '呈现位管理',
                    path: '/resource_level_list'
                }, {
                    title: '编辑呈现位'
                }];
            const addTitle = [
                {
                    title: '呈现位管理',
                    path: '/resource_level_list'
                }, {
                    title: '创建呈现位'
                }];
            return this.id ? editTitle : addTitle;
        },
        resourceLevelStr() {
            let resourceLevelStr = '';
            switch(parseInt(this.formData.type, 10)) {
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
        // 获取渠道平台数据
        this.handleGetAllChannelAndNicheGroup();
        // 获取资源位集合列表数据
    },
    methods: {
        async handleGetAllChannelAndNicheGroup() {
            this.pageLoad = true;
            // const res = await resourceLevelDisplayServer.getAllChannelAndResource();
            const res = await server.getAllChannelAndResource();
            const nicheGroupRes = await server.getNicheGroup();
            if (res.data.code === 200 && nicheGroupRes.data.code === 200) {
                // 处理渠道数据
                // debugger;
                const respondData = res.data.data.content;
                this.originalRespondData = respondData;
                if (!this.getChannelData(respondData)) {
                    return false;
                }
                this.channelItems = this.getChannelData(respondData);
                this.getResourceData(this.channelItems[0].value, 'initData');
                // 处理资源位集合数据
                this.nicheGroup = nicheGroupRes.data.data.content;
                // 加载页面详情数据
                if (this.id) {
                    const res = await server.getResourceLevelDetail(this.id);
                    this.detailData = res.data.data;

                    // 保留原始的呈现位类型
                    this.originalType = this.detailData.type;
                    if (res.data.code === 200) {
                        for (const key in this.formData) {
                            this.formData[key] = this.detailData[key];
                        }
                        console.log('=======', this.formData);
                        // 通过channelId，
                        // this.getTreeData(this.formData.channelId, this.formData.area[0].rootId, this.formData.area[0].ids);
                    }
                }
                this.pageLoad = false;
            }
        },
        getChannelData(respondData) {
            // 获取渠道数据
            const channelData = [];
            // debugger;
            if (respondData === undefined) {
                this.$message.error('获取渠道失败，请检查对应接口');
                return false;
            }
            respondData.forEach((value, key) => {
                channelData[key] = {
                    label: value.name,
                    value: value.id
                };
            });
            return channelData;
        },
        getResourceData(channelId, changeType) {
            // 根据渠道id获取对应平台列表
            for (let i = 0; i < this.originalRespondData.length; i++) {
                if (this.originalRespondData[i].id === channelId) {
                    const areaData = this.originalRespondData[i].area;
                    const resourceData = [];
                    for (let i = 0; i < areaData.length; i++) {
                        resourceData.push({
                            label: areaData[i].rootName,
                            value: areaData[i].rootId
                        });
                    }
                    this.resourceItems = resourceData;
                    // 第一切换channelId的时候不需要将rootId置为空
                    if (this.isFirst === false) {
                        this.formData.rootId = '';
                    } else if (this.isFirst === true && changeType === 'dataChange') {
                        this.isFirst = false;
                    }
                    // debugger;
                }
            }
        },
        /* v3.3不需要获取tree数据了 暂不用handleGetTreeData getTreeData setCheckedKeys方法*/
        handleGetTreeData() {
            this.getTreeData(this.formData.channelId, this.formData.area[0].rootId);
        },
        async getTreeData(channelId, rootId, ids) {
            // 通过渠道id和平台id获取支持的渠道树
            console.log(channelId);
            console.log(rootId);
            // const channelId = this.formData.channelId;
            // const rootId = this.formData.area[0].rootId;
            // 如果rootId为空时，直接返回，不执行函数
            if (!rootId) {
                console.log('rootId-平台id不存在');
                return false;
            }
            let requestData = {};
            // debugger;
            for (let i = 0; i < this.originalRespondData.length; i++) {
                if (this.originalRespondData[i].id === channelId) {
                    // requestData = this.originalRespondData[i].area;
                    for (let j = 0; j < this.originalRespondData[i].area.length; j++) {
                        if (this.originalRespondData[i].area[j].rootId === rootId) {
                            requestData = this.originalRespondData[i].area[j];
                        }
                    }
                }
            }
            // debugger;
            console.log(requestData);
            const res = await server.getNicheTree(requestData);
            this.treeData = [];
            console.log('返回的tree数据', res.data.data);
            this.treeData.push(res.data.data);
            if (ids) {
                this.$nextTick(() => {
                    this.setCheckedKeys(ids);
                });
            }
            // console.log(res);
            // const resData = res.data.data;
            // this.originalResourceData = resData;
            // this.resourcePositionItems = [];
            // if (res.data.code === 200) {
            //     for (let i = 0; i < resData.length; i++) {
            //         this.resourcePositionItems.push({
            //             label: resData[i].name, value: resData[i].id
            //         });
            //     }
            //     console.log(this.resourcePositionItems);
            // } else {
            //     console.log('请求结果错误');
            // }
        },
        setCheckedKeys(treeArr) {
            this.$refs.tree.setCheckedKeys(treeArr);
        },
        async handleSubmitForm(formName) {
            let parentVaild;
            console.log(this.$refs  [formName]);
            this.$refs[formName].validate(valid => {
                parentVaild = valid;
            });
            setTimeout(function () {
                if ($('.is-error').length > 0) {
                    $('.is-error')[0].focus();
                }
            }, 0);
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
                        this.$router.push({path: '/resource_level_list'});
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
                        this.$router.push({path: '/resource_level_list'});
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
            this.$router.push({path: '/resource_level_list'});
        }
    }
};
