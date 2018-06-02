import emitter from 'element-ui/lib/mixins/emitter';
import deepCopy from 'deepcopy';


export default {
    props: {
        value: {
            type: Array,
            required: true
        },
        title: {
            type: Array,
            required: true
        },
        dataSource: {
            type: Array,
            required: true
        },
        validateEvent: {
            type: Boolean,
            default: true
        }
    },
    mixins: [emitter],
    data() {
        return {
            data: this.getProcessedDataSource(this.dataSource),
            isShowSecondPanel: false,
            isShowThirdPanel: true
        };
    },
    computed: {
        data2: {
            // getter
            get() {
                let data;
                this.data.forEach(item => {
                    if (item.showChildren) {
                        return data = item.childNodes && item.childNodes.length ? item.childNodes : [item];
                    }
                });
                return data;
            },
            // setter
            set() {
                // console.log(newValue);// 数据绑定了 不需要手动赋值给data
            }
        },
        data3() {
            const data = [];
            this.processValue(this.data, data);
            return data;
        }
    },
    created() {
        this.setValue(this.value);
    },
    watch: {
        'dataSource'(val) {
            this.data = this.getProcessedDataSource(val);
        },
        'value'(val) {
            if (JSON.stringify(val) === JSON.stringify(this.data3)) return false;
            this.data = this.getProcessedDataSource(this.data);
            this.setValue(val);
        }
    },
    methods: {
        getProcessedDataSource(data) {
            const dataSource = deepCopy(data);
            this.processedDataSource(dataSource);
            dataSource.forEach(dataItem => {
                dataItem.isIndeterminate = false;
                delete dataItem.parentId;
            });
            return dataSource;
        },
        processedDataSource(dataSource) {
            dataSource.forEach(dataItem => {
                if (dataItem.childNodes) {
                    dataItem.checked = false;
                    dataItem.showChildren = dataItem.showChildren || false;
                    this.processedDataSource(dataItem.childNodes);
                } else {
                    dataItem.checked = false;
                }
            });
        },
        processValue(data, values) {
            data.forEach(dataItem => {
                if (dataItem.childNodes && dataItem.childNodes.length) {
                    this.processValue(dataItem.childNodes, values);
                } else {
                    if (dataItem.checked) {
                        values.push({id: dataItem.id, name: dataItem.name, parentId: dataItem.parentId});
                    }
                }
            });
        },
        handleChangeCheck(item, index, type = 'change') {
            if (type === 'change') {
                if (!item.parentId) {
                    this.handleChangeParentCheck(index);
                } else {
                    this.handleChangeChildCheck(item);
                }
            } else {
                this.handleDeleteItem(item);
            }
            this.$emit('input', deepCopy(this.data3));
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [this.data3]);
            }
        },
        handleChangeParentCheck(index) {
            const isChecked = this.data[index].checked;
            this.data[index].isIndeterminate = false;
            if (this.data[index].childNodes) {
                this.data[index].childNodes.forEach(item => {
                    item.checked = isChecked;
                });
            }
        },
        handleChangeChildCheck({parentId}) {
            let allChecked = true;
            let isIndeterminate = false;
            let parentNode;
            let childNodes;
            this.data.forEach(dataItem => {
                if (dataItem.id === parentId) {
                    childNodes = dataItem.childNodes;
                    parentNode = dataItem;
                }
            });
            childNodes.forEach(item => {
                if (!item.checked) {
                    allChecked = false;
                }
            });
            if (!allChecked) {
                childNodes.forEach(item => {
                    if (item.checked) {
                        isIndeterminate = true;
                    }
                });
            }
            parentNode.checked = allChecked;
            parentNode.isIndeterminate = isIndeterminate;
        },
        handleClickItem(index) {
            this.data.forEach(item => {
                item.showChildren = false;
            });
            this.data[index].showChildren = true;
        },
        handleDeleteItem({id, parentId}) {
            this.processData(id, this.data);
            let isIndeterminate = false;
            this.data.forEach(dataItem => {
                if (dataItem.id === parentId) {
                    dataItem.checked = false;
                    dataItem.childNodes.forEach(item => {
                        if (item.checked) {
                            isIndeterminate = true;
                        }
                    });
                    dataItem.isIndeterminate = isIndeterminate;
                }
            });
        },
        processData(id, data) {
            data.forEach(dataItem => {
                if (dataItem.childNodes && dataItem.childNodes.length) {
                    this.processData(id, dataItem.childNodes);
                } else {
                    if (dataItem.id === id) {
                        dataItem.checked = false;
                    }
                }
            });
        },
        setValue(value) {
            value.forEach(dataItem => {
                this.updateChildChecked(this.data, dataItem.id);
            });
            this.updateParentChecked(this.data);
        },
        updateChildChecked(data, id) {
            data.forEach(dataItem => {
                if (dataItem.childNodes && dataItem.childNodes.length) {
                    this.updateChildChecked(dataItem.childNodes, id);
                } else {
                    if (dataItem.id === id) {
                        return dataItem.checked = true;
                    }
                }
            });
        },
        updateParentChecked(data) {
            data.forEach(dataItem => {
                if (dataItem.childNodes && dataItem.childNodes.length) {
                    let allChecked = true;
                    dataItem.childNodes.forEach(item => {
                        if (!item.checked) {
                            return allChecked = false;
                        }
                    });
                    dataItem.checked = allChecked;
                    if (!allChecked) {
                        dataItem.childNodes.forEach(item => {
                            if (item.checked) {
                                dataItem.isIndeterminate = true;
                            }
                        });
                    }
                }
            });
        }
    }
};
