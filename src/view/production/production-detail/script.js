import server from '../../../api/resource-level-manager/resource-level-check';
import resourceLevelAddServer from '../../../api/resource-level-manager/resource-level-add';
import Page from '../../../component/page';
import customCard from '../../../component/custom-card';
import resourceDisplayTree from '../../../component/resource-display-tree';

export default {
    components: {
        Page,
        customCard,
        resourceDisplayTree
    },
    data() {
        return {
            header: [
                {
                    title: '呈现位管理',
                    path: '/resource_level_list' // 可不填此字段
                }, {
                    title: '查看呈现位'
                    // path: '二级菜单路径'// 可不填此字段
                }
            ],
            title: '查看呈现位',
            isLoad: false,
            isLoadTree: true,
            id: this.$route.query.id,
            detailData: {},
            dataSource: []
            // dataSource: [
            //     {
            //         name: '联想渠道',
            //         level: 1,
            //         child: [{
            //             name: 'TV',
            //             level: 2,
            //             child: [
            //                 {
            //                     name: '联想',
            //                     level: 3,
            //                     child: [
            //                         {name: '65i3',
            //                             level: 4,
            //                             child: [
            //                                 {name: '65i3',
            //                                     level: 5,
            //                                     child: [
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         }
            //                                     ]},
            //                                 {name: '65i3',
            //                                     level: 5},
            //                                 {name: '65i3',level: 5},
            //                                 {name: '65i3',level: 5}
            //                             ]
            //                         },
            //                         {name: '65i3',
            //                             level: 4},
            //                         {name: '65i3',level: 4},
            //                         {name: '65i3',level: 4}
            //                     ]
            //                 },
            //                 {
            //                     name: '夏普',
            //                     level: 3,
            //                     child: [
            //                         {
            //                             name: '65i3',
            //                             level: 4
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }]
            //     },
            //     {
            //         name: '联想渠道',
            //         level: 1,
            //         child: [{
            //             name: 'TV',
            //             level: 2,
            //             child: [
            //                 {
            //                     name: '联想',
            //                     level: 3,
            //                     child: [
            //                         {name: '65i3',
            //                             level: 4,
            //                             child: [
            //                                 {name: '65i3',
            //                                     level: 5,
            //                                     child: [
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         },
            //                                         {
            //                                             name: '65i3',
            //                                             level: 6
            //                                         }
            //                                     ]},
            //                                 {name: '65i3',
            //                                     level: 5},
            //                                 {name: '65i3',level: 5},
            //                                 {name: '65i3',level: 5}
            //                             ]
            //                         },
            //                         {name: '65i3',
            //                             level: 4},
            //                         {name: '65i3',level: 4},
            //                         {name: '65i3',level: 4}
            //                     ]
            //                 },
            //                 {
            //                     name: '夏普',
            //                     level: 3,
            //                     child: [
            //                         {
            //                             name: '65i3',
            //                             level: 4
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }]
            //     }
            // ]
        };
    },
    computed: {},
    async mounted() {
        if (this.id) {
            const res = await server.getResourceLevelDetail(this.id);
            this.detailData = res.data.data;
            // this.getTreeData(this.detailData.area[0]);
        }
    },
    filters: {
        typeFilter(type) {
            switch (Number(type)) {
                case 1:
                    return '普通资源位';
                case 2:
                    return '视频资源位';
                case 3:
                    return 'push资源位';
            }
        },
        statusFilter(value) {
            switch (Number(value)) {
                case 1:
                    return '上架';
                case 2:
                    return '下架';
            }
        }
    },
    methods: {
        handleBack() {
            this.$router.push({path: '/resource_level_list'});
        },
        async getTreeData(requestData) {
            delete requestData.rootName;
            const res = await resourceLevelAddServer.getNicheTree(requestData);
            this.dataSource = [];
            console.log('返回的tree数据', res.data.data);
            this.dataSource.push(res.data.data);
        },
        cancelLoading() {
            this.isLoadTree = false;
        }
    }
};
