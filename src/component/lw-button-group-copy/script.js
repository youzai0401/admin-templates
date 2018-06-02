import emitter from 'element-ui/lib/mixins/emitter';
export default {
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        items: {
            type: Array,
            required: true
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        selectAll: {
            type: Boolean,
            default: false
        },
        compareKey: {
            type: String,
            default: 'id'
        }
    },
    mixins: [emitter],
    data() {
        return {
            currentValue: this.value,
            isCheckedArray: []
        };
    },
    mounted() {
    },
    watch: {},
    methods: {
        handleClick(data, index) {
            // 将对于状态置为对应值
            const copyData = [];
            const isExistence = this.isExistence(data, this.currentValue, this.compareKey);
            if (isExistence) {
                for (let i = 0; i < this.currentValue.length; i++) {
                    if (this.currentValue[i][this.compareKey] !== data[this.compareKey]) {
                        copyData.push(this.currentValue[i]);
                    }
                }
                this.currentValue = copyData;
                this.isCheckedArray[index] = false;
            } else {
                this.currentValue.push(data);
                this.isCheckedArray[index] = true;
            }
            // 更新选择数据
            this.getSelectLabels();
        },
        getSelectLabels() {
            this.$emit('input', this.currentValue);
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', this.currentValue);
            }
        },
        handleSelectAll() {
            const len = this.items.length;
            if (this.currentValue.length === len) {
                this.currentValue = [];
                this.isCheckedArray = [];
            } else {
                this.currentValue = this.items;
                for (let i = 0; i<this.items.length; i++) {
                    this.isCheckedArray[i] = true;
                }
            }
            // 更新选择数据
            this.getSelectLabels();
        },
        isChecked(item) {
            this.isExistence(item, this.currentValue, this.compareKey);
        },
        // 判断是否存在
        isExistence(item, originData, key) {
            for (let i = 0; i < originData.length; i++) {
                if (item[key] === originData[i][key]) {
                    return true;
                }
            }
            return false;
        }
    }
};
