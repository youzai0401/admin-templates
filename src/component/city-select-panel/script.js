import emitter from 'element-ui/lib/mixins/emitter';
import deepCopy from 'deepcopy';

export default {
    props: {
        initData: {
            type: Array,
            required: true
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        value: {
            type: Array,
            required: true
        },
        title: {
            type: Array
        }
    },
    mixins: [emitter],
    data() {
        return {
            // dataSource: [],
            citySource: [],
            selectedCityData: []
        };
    },
    computed: {
        dataSource() {
            const data = [...this.initData];
            for (let i = 0, len = data.length; i < len; i++) {
                data[i].isIndeterminate = false;
                data[i].isChecked = false;
                if (data[i].childNodes.length !== 0) {
                    for (let j = 0, cLen = data[i].childNodes.length; j < cLen; j++) {
                        data[i].childNodes[j].isChecked = false;
                    }
                } else {
                    data[i].childNodes.push({
                        id: data[i].id,
                        name: data[i].name,
                        isChecked: data[i].isChecked,
                        parentId: data[i].id
                    });
                }
            }
            return data;
        }
    },
    created() {
    },
    mounted() {
        // this.dataSource = this.getProcessedDataSource(this.initData);
    },
    watch: {
        // initData() {
        //     this.dataSource = this.getProcessedDataSource(this.initData);
        // }
        // 'value'(val) {
        //     this.setCityData(val);
        // }
    },
    methods: {
        getProcessedDataSource(data) {
            const dataSource = deepCopy(data);
            return this.initCityData(dataSource);
        },
        handleClickProvince(id, index, isChecked) {
            console.log('省份数据', id, index, isChecked);

            this.citySource = this.dataSource[index];

            if (isChecked === true) {
                this.dataSource[index].childNodes.forEach((item) => {
                    item.isChecked = true;
                });
                this.dataSource[index].isIndeterminate = false;
                this.dataSource[index].isChecked = true;
            } else if (isChecked === false) {
                this.dataSource[index].childNodes.forEach((item) => {
                    item.isChecked = false;
                });
                this.dataSource[index].isIndeterminate = false;
                this.dataSource[index].isChecked = false;
            }
            // 获取选中数据
            this.getSelectedCityData();
        },
        handleClickCity(cityId, index, isChecked, provinceId, isDelete) {
            // 从对应所有数据找到对应的处理数据

            let dataSourceIndex;
            for (let i = 0, len = this.dataSource.length; i < len; i++) {
                if (provinceId === this.dataSource[i].id) {
                    dataSourceIndex = i;
                    break;
                }
            }
            // this.citySource = this.dataSource[dataSourceIndex];
            // debugger;
            if (isChecked === true) {
                this.dataSource[dataSourceIndex].childNodes[index].isChecked = false;
            } else if (isChecked === false) {
                this.dataSource[dataSourceIndex].childNodes[index].isChecked = true;
            }
            // 遍历该省份城市数据，判断父级状态
            let checkedNodeLen = 0;
            const cityNodeLen = this.dataSource[dataSourceIndex].childNodes.length;
            for (let i = 0; i < cityNodeLen; i++) {
                if (this.dataSource[dataSourceIndex].childNodes[i].isChecked === true) {
                    checkedNodeLen++;
                }
            }
            if (checkedNodeLen === cityNodeLen) {
                this.dataSource[dataSourceIndex].isIndeterminate = false;
                this.dataSource[dataSourceIndex].isChecked = true;
            } else if (checkedNodeLen !== 0) {
                this.dataSource[dataSourceIndex].isIndeterminate = true;
                this.dataSource[dataSourceIndex].isChecked = false;
            } else if (checkedNodeLen === 0) {
                this.dataSource[dataSourceIndex].isIndeterminate = false;
                this.dataSource[dataSourceIndex].isChecked = false;
            }
            if (isDelete !== 'delete') {
                this.citySource = this.dataSource[dataSourceIndex];
            }
            // 获取选中数据
            this.getSelectedCityData();
        },
        getSelectedCityData() {
            const selectedData = [];
            for (let i = 0, provinceLen = this.dataSource.length; i < provinceLen; i++) {
                for (let j = 0, cityLen = this.dataSource[i].childNodes.length; j < cityLen; j++) {
                    if (this.dataSource[i].childNodes[j].isChecked === true) {
                        selectedData.push(this.dataSource[i].childNodes[j]);
                    }
                }
            }
            this.selectedCityData = selectedData;
            console.log('selectedData', selectedData);
            this.updatePropValue();
            return selectedData;
        },
        updatePropValue() {
            let value = deepCopy(this.selectedCityData);
            // 只要id
            value = this.getDataId(value);
            this.$emit('input', value);
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        },
        handleDeleteData(cityData) {
            let dataSourceIndex;
            let cityIndex;
            for (let i = 0, len = this.dataSource.length; i < len; i++) {
                if (cityData.parentId === this.dataSource[i].id) {
                    dataSourceIndex = i;
                    break;
                }
            }
            for (let i = 0, len = this.dataSource[dataSourceIndex].childNodes.length; i < len; i++) {
                if (cityData.id === this.dataSource[dataSourceIndex].childNodes[i].id) {
                    cityIndex = i;
                    break;
                }
            }
            this.handleClickCity(cityData.id, cityIndex, true, cityData.parentId, 'delete');
        },
        initCityData(data) {
            console.log('data1', data);
            for (let i = 0, len = data.length; i < len; i++) {
                data[i].isIndeterminate = false;
                data[i].isChecked = false;
                if (data[i].childNodes.length !== 0) {
                    for (let j = 0, cLen = data[i].childNodes.length; j < cLen; j++) {
                        data[i].childNodes[j].isChecked = false;
                    }
                } else {
                    data[i].childNodes.push({
                        id: data[i].id,
                        name: data[i].name,
                        isChecked: data[i].isChecked,
                        parentId: data[i].id
                    });
                }
            }
            console.log('data2', data);
            return data;
        },
        setCityData(cityData) {
            // this.dataSource
            // cityData = [130100, 130700, 900000, 110100];
            const selectedCityData = [];
            for (let i = 0, len = this.dataSource.length; i < len; i++) {
                if (this.dataSource[i].childNodes.length !== 0) {
                    let checkedNodeLen = 0;
                    const cityNodeLen = this.dataSource[i].childNodes.length;
                    for (let j = 0; j < cityNodeLen; j++) {
                        this.dataSource[i].childNodes[j].isChecked = false;
                        if (cityData.indexOf(this.dataSource[i].childNodes[j].id) > -1) {
                            this.dataSource[i].childNodes[j].isChecked = true;
                            checkedNodeLen++;
                            selectedCityData.push(this.dataSource[i].childNodes[j]);
                        }
                    }
                    if (checkedNodeLen === cityNodeLen) {
                        this.dataSource[i].isIndeterminate = false;
                        this.dataSource[i].isChecked = true;
                    } else if (checkedNodeLen !== 0) {
                        this.dataSource[i].isIndeterminate = true;
                        this.dataSource[i].isChecked = false;
                    } else if (checkedNodeLen === 0) {
                        this.dataSource[i].isIndeterminate = false;
                        this.dataSource[i].isChecked = false;
                    }
                }
            }
            this.selectedCityData = selectedCityData;
            console.log(this.dataSource);
            this.updatePropValue();
        },
        getDataId(data) {
            const idArr = [];
            for (let i = 0; i < data.length; i++) {
                idArr.push(data[i].id);
            }
            return idArr;
        }
    }
};
