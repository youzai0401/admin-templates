/*
 * 分页
 * 约定 ：
 * fn:
 * getList() // 获取数据
 *
 * data:
 * paginationData为分页数据
 *   .currentPage 当前页
 *   .limit 每条显示多少个
 *   .total 总数
 * paramsData为接口数据
 *   .limit
 *   .offset
 * saveParamsData在具体页面点击查询或者其他查询操作时执行（点分页查询不用管）
 * isSaveParams离开当前列表时是否保存查询的各种字段，比如在点击编辑或查看等进入二级页面的操作时执行setIsSaveParams
 */
let sessionPaginationData = null;
let sessionParamsData = null;
let sessionRouterPath;

export default {
    data() {
        return {
            pageSizes: [10, 20, 30, 50, 80, 100],
            paginationData: {
                currentPage: 1,
                limit: 10,
                total: 0
            },
            isSearch: false,
            isSaveParams: false
        };
    },
    created() {
        console.log(this.$route);
        console.log('sessionPaginationData:', sessionPaginationData);
        console.log('===============');
        console.log('sessionParamsData', sessionParamsData);
        console.log(sessionRouterPath, this.$route.path);
        if (sessionPaginationData && sessionParamsData && this.$route.path === sessionRouterPath) {
            this.setParams();
        }
    },
    destroyed() {
        if (!this.isSaveParams) {
            this.resetParams();
        }
    },
    methods: {
        changeSize(size) {
            console.log(`每页 ${size} 条`);
            this.paramsData.limit = size;
            this.paginationData.limit = size;
            this.paginationData.currentPage = 1;
            this.getList(this.paramsData);
        },
        changeCurPage(curPage) {
            if (this.isSearch) {
                return this.isSearch = false;
            }
            console.log(`当前页: ${curPage}`);
            // 更新currentPage数据
            this.paginationData.currentPage = curPage;
            this.paramsData.offset = (curPage - 1) * this.paramsData.limit;
            this.getList(this.paramsData);
        },
        getAddIndexTableData(data) {
            data.forEach((dataItem, index) => {
                dataItem.index = this.paramsData.offset + index + 1;
            });
            return data;
        },
        resetOffset() {
            if (this.paginationData.currentPage !== 1) {
                this.isSearch = true;
            }
            this.paginationData.currentPage = 1;
            this.paramsData.offset = 0;
        },
        saveParams() {
            sessionParamsData = {...this.paramsData};
            console.log('11111111111111111', this.paramsData);
            sessionPaginationData = {...this.paginationData};
            sessionRouterPath = this.$route.path;
        },
        setParams() {
            this.paginationData = {...sessionPaginationData};
            this.paramsData = {...sessionParamsData};
        },
        resetParams() {
            sessionPaginationData = null;
            sessionParamsData = null;
            sessionRouterPath = '';
        },
        setIsSaveParams() {
            this.isSaveParams = true;
        }
    }
};
