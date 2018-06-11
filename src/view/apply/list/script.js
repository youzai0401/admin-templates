import server from '../../../api/apply-manage/index';
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
        return {
            btnText: '创建客户',
            title: '申请管理',
            tableData: [],
            paramsData: {
                size: 10,
                page: 1
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
        toPath() {
            this.setIsSaveParams();
            this.$router.push('/apply_add');
        },
        async getList(data = this.paramsData) {
            this.listLoading = true;
            this.saveParams();
            const res = await server.getApplyList(data).catch(() => this.listLoading = false);
            this.listLoading = false;
            console.log('userlist', res);
            if (res.data.code === 200) {
                this.tableData = this.getAddIndexTableData(res.data.data.content);
                this.tableData = this.getTransformData(this.tableData);
                this.paginationData.total = res.data.data.totalElements;
            }
        },
        getTransformData(data) {
            // data.forEach(item => {
            //     if (item.imageList.length !== 0) {
            //         item.displayUrl = item.imageList[0].url;
            //     }
            // });
            return data;
        },
        handleSearch() {
            this.resetOffset();
            this.getList();
        },
        handleEdit(id) {
            this.setIsSaveParams();
            this.$router.push({
                path: '/apply_add', query: {
                    id
                }
            });
        },
        handleDel(id) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                server.deleteApply(id).then(res => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList();
                    }
                });
            });
        },
        handleChangeStatus(id, status) {
            server.changeApplyStatus(id, status).then(res => {
                if (res.data.code === 200) {
                    this.$message({
                        message: '状态改变成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        formatterStatus(row) {
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
    mounted() {
    }

};
