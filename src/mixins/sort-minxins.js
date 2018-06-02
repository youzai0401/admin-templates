/**
 * Created by Lzhang on 2017/9/26.
 */
export default {
    methods: {
        createRenderHeader(callback = this.getList) {
            return (h, {column}) => {
                // 下面是 el-tooltip 的两种用法，对应h函数的两种写法
                const labelArr = column.label.split(' ');
                const H = h(labelArr.length === 1 ? 'div' : 'el-tooltip', {
                    props: {
                        placement: 'top',
                        effect: 'light',
                        content: labelArr[1]
                    },
                    style: {
                        cursor: 'pointer'
                    },
                    class: {
                        descending: this.paramsData.sortField === column.property && this.paramsData.isDescending,
                        ascending: this.paramsData.sortField === column.property && !this.paramsData.isDescending
                    }
                }, [h('div', {
                    on: {
                        click: () => this.handleTableSort(column, callback)
                    }
                }, [labelArr[0], h('span', {
                    class: {
                        'caret-wrapper': true
                    }
                }, [h('i', {
                    class: {
                        'sort-caret': true,
                        ascending: true
                    }
                }), h('i', {
                    class: {
                        'sort-caret': true,
                        descending: true
                    }
                })])])]);
                return H;
            };
        },
        handleTableSort(column, callback) {
            this.paramsData.isDescending = this.paramsData.sortField === column.property ? !this.paramsData.isDescending : true;
            this.paramsData.sortField = column.property;
            const direction = this.paramsData.isDescending ? 1 : 0;
            this.paramsData.sort = JSON.stringify([{direction, sortField: this.paramsData.sortField}]);
            if (callback) {
                callback();
            }
        }
    }
};