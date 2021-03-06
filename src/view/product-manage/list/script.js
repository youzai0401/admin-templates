import server from '../../../api/product-manage/index';
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
            btnText: '创建产品',
            title: '产品管理',
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
            this.$router.push('/product_add');
        },
        async getList(data = this.paramsData) {
            this.listLoading = true;
            this.saveParams();
            const res = await server.getList(data).catch(() => this.listLoading = false);
            this.listLoading = false;
            if (res.data.code === 200) {
                console.log('贷款产品列表', res);
                this.tableData = this.getAddIndexTableData(res.data.data.content);
                this.tableData = this.getTransformData(this.tableData);
                this.paginationData.total = res.data.data.totalElements;
            }
        },
        getTransformData(data) {
            data.forEach(item => {
                // if (item.imageList.length !== 0) {
                //     item.displayUrl = item.imageList[0].url;
                // }
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
                path: '/product_add', query: {
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
                console.log(id);
                this.deleteProduction(id);
            });
        },
        deleteProduction(id) {
            server.deleteProduction(id).then(res => {
                // if (res.data.code === 200) {
                //     this.$message.success('删除成功');
                //     this.getList();
                // }
                if (res.status === 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getList();
                } else {
                    this.$message.error(res.data.data);
                }
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
    mounted() {
    }

};
