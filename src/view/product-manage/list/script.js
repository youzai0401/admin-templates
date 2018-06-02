import server from '../../../api/resource-level-manager/resource-level-list';
import pageMixin from '../../../mixins/page-mixins';
import common from '../../../common/common';
import page from '../../../component/page';
import customCard from '../../../component/custom-card';

export default {
    mixins: [pageMixin],
    components: {
        page,
        customCard
    },
    data() {
        const meta = this.$router.currentRoute.meta;
        return {
            meta,
            btnPower: {name: 'establish', power: meta},
            btnText: '创建呈现位',
            title: '呈现位管理',
            tableData: [],
            paramsData: {
                limit: 10,
                offset: 0,
                name: '',
                creatorName: '',
                status: 0
            },
            listLoading: false,
            newTreeData: []
        };
    },
    created() {
        this.getList();
    },
    filters: {
        statusFilter(value) {
            switch (value) {
                case 1:
                    return '上架';
                case 2:
                    return '下架';
            }
        }
    },
    methods: {
        isHaveHandle() {
            const btns = ['edit', 'see', 'delete_key'];
            if (this.meta.role) {
                let index = 0;
                for (let i = 0, len = btns.length; i < len; i++) {
                    if (this.meta.authority.indexOf(btns[i]) === -1) {
                        index++;
                    }
                }
                if (btns.length === index) {
                    return false;
                }
            }
            return true;
        },
        toPath() {
            this.setIsSaveParams();
            this.$router.push('/resource_level_add');
        },
        async getList(data = this.paramsData) {
            this.listLoading = true;
            this.saveParams();
            const res = await server.getResourceLevelList(data).catch(() => this.listLoading = false);
            this.listLoading = false;
            if (res.data.code === 200) {
                this.tableData = this.getAddIndexTableData(res.data.data.content);
                this.tableData = this.getTransformData(this.tableData);
                this.paginationData.total = res.data.data.totalElements;
            }
        },
        getTransformData(data) {
            data.forEach(item => {
                if (item.imageList.length !== 0) {
                    item.displayUrl = item.imageList[0].url;
                }
            });
            return data;
        },
        handleSearch() {
            this.resetOffset();
            this.getList();
        },
        handleEdit(id) {
            this.setIsSaveParams();
            this.$router.push({
                path: '/resource_level_add', query: {
                    id
                }
            });
        },
        handleCheck(id) {
            this.setIsSaveParams();
            this.$router.push({
                path: '/resource_level_check', query: {
                    id
                }
            });
        },
        handleDel({id}) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                this.deleteResourceLevel(id);
            });
        },
        deleteResourceLevel(id) {
            server.deleteResourceLevel(id).then(res => {
                if (res.data.code === 200) {
                    this.$message.success('删除成功');
                    this.getList();
                }
                // if (res.status === 200) {
                //     this.$message({
                //         message: res.data.message,
                //         type: 'error'
                //     });
                //     this.getList();
                // } else {
                //     this.$message.error(res.data.data);
                // }
            });
        },
        formatterStatus(row, column, cellValue) {
            switch (row.status) {
                case 1:
                    return '上架';
                case 2:
                    return '下架';
                default:
                    return false;
            }
        },
        // 时间转换函数
        yearMonDayFilter(row, column) {
            return common.format(row[column.property], 'yyyy-MM-dd');
        }
    },
    async mounted() {
        // const res = await aaaa.getPlatformTree();
        // if (res.status === 200) {
        //     const args = {
        //         id: 'id',
        //         name: 'name',
        //         parentId: 'pId'
        //     }
        //     const processData = (o, newData) => {
        //         for (const i in o) {
        //             const newObj = {};
        //             for (const key in o[i]) {
        //                 if (key === 'id' || key === 'name' || key === 'parentId') {
        //                     newObj[args[key]] = o[i][key];
        //                 }
        //             }
        //             newData.push(newObj);
        //             if (o[i].childNodes && o[i].childNodes.length) {
        //                 processData(o[i].childNodes, newData);
        //             }
        //         }
        //     };
        //     const newData = [];
        //     processData(res.data.data.childNodes, newData);
        //     console.log(newData, '===')
        //     // this.newTreeData = newData;
        //     // createTree(this.newTreeData);
        //     var setting = {
        //         check: {
        //             enable: true
        //         },
        //         data: {
        //             key: {
        //                 children: 'childNodes'
        //             },
        //             simpleData: {
        //                 enable: true,
        //                 idKey: 'id',
        //                 pIdKey: 'parentId'
        //             }
        //         },
        //         callback: {
        //             onCheck: onCheck
        //         }
        //     };
        //     var ruler = {
        //         doc: null,
        //         ruler: null,
        //         cursor: null,
        //         minCount: 5000,
        //         count: 5000,
        //         stepCount: 500,
        //         minWidth: 30,
        //         maxWidth: 215,
        //         init: function () {
        //             ruler.doc = $(document);
        //             ruler.ruler = $("#ruler");
        //             ruler.cursor = $("#cursor");
        //             if (ruler.ruler) {
        //                 ruler.ruler.bind("mousedown", ruler.onMouseDown);
        //
        //             }
        //         },
        //         onMouseDown: function (e) {
        //             ruler.drawRuler(e, true);
        //             ruler.doc.bind("mousemove", ruler.onMouseMove);
        //             ruler.doc.bind("mouseup", ruler.onMouseUp);
        //             ruler.doc.bind("selectstart", ruler.onSelect);
        //             $("body").css("cursor", "pointer");
        //         },
        //         onMouseMove: function (e) {
        //             ruler.drawRuler(e);
        //             return false;
        //         },
        //         onMouseUp: function (e) {
        //             $("body").css("cursor", "auto");
        //             ruler.doc.unbind("mousemove", ruler.onMouseMove);
        //             ruler.doc.unbind("mouseup", ruler.onMouseUp);
        //             ruler.doc.unbind("selectstart", ruler.onSelect);
        //             ruler.drawRuler(e);
        //         },
        //         onSelect: function (e) {
        //             console.log(e);
        //             return false;
        //         },
        //         getCount: function (end) {
        //             var start = ruler.ruler.offset().left + 1;
        //             var c = Math.max((end - start), ruler.minWidth);
        //             c = Math.min(c, ruler.maxWidth);
        //             return {width: c, count: (c - ruler.minWidth) * ruler.stepCount + ruler.minCount};
        //         },
        //         drawRuler: function (e, animate) {
        //             var c = ruler.getCount(e.clientX);
        //             ruler.cursor.stop();
        //             if ($.browser.msie || !animate) {
        //                 ruler.cursor.css({width: c.width});
        //             } else {
        //                 ruler.cursor.animate({width: c.width}, {duration: "fast", easing: "swing", complete: null});
        //             }
        //             ruler.count = c.count;
        //             ruler.cursor.text(c.count);
        //         }
        //     }
        //
        //     function onCheck(e, treeId, treeNode) {
        //         count();
        //     }
        //
        //     function count() {
        //         var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        //             checkCount = zTree.getCheckedNodes(true);
        //         console.log(checkCount);
        //
        //         // zTree.expandNode(checkCount[0], true, true, true);
        //     }
        //
        //     ruler.init("ruler");
        //     // setting.check.enable = true;
        //     $.fn.zTree.init($("#treeDemo"), setting, res.data.data.childNodes);
        //
        //     var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        //     // const nodeArr = [];
        //     // for(let i=0,length=newData.length; i<length;i++){
        //     //
        //     //     let node = treeObj.getNodeByParam("id", newData[i].id, null);
        //     //     nodeArr.push(node.parentId);
        //     //     treeObj.selectNode(node);
        //     //     node.checked = true;
        //     //     treeObj.updateNode(node);
        //     //     i=i+100;
        //     // }
        //
        //
        //     treeObj.expandAll(true);
        //
        //     // var node = treeObj.getNodeByParam("id", 132, null);
        //     // console.log(node);
        //     //     // treeObj.expandNode(node, true, true, true);
        //     // treeObj.selectNode(node);
        //     // node.checked = true;
        //     // treeObj.updateNode(node);
        //     //
        //     // var node53 = treeObj.getNodeByParam("id", 53, null);
        //     // node53.checked = true;
        //     // treeObj.updateNode(node53);
        //     // treeObj.expandAll(true);
        //
        // } else {
        //     this.$message.error(res.data);
        // }

    }

};
