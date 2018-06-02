/*
*params:value:绑定值
*       items:原数据
*       validateEvent:是否需要校验
*       selectAll:是否需要选择全部选项的功能
*       compareKey:选择比较的关键key值
* */

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
            currentValue: this.value
        };
    },
    mounted() {
        for (let j = 0; j < this.value.length; j++) {
            for (let i = 0, len = this.items.length; i < len; i++) {
                if (this.items[i][this.compareKey] === this.value[j][this.compareKey]) {
                    this.$set(this.items[i], 'checked', true);
                }
            }
        }
    },
    watch: {
        'value'(val) {
            for (let j = 0; j < this.value.length; j++) {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i][this.compareKey] === this.value[j][this.compareKey]) {
                        this.$set(this.items[i], 'checked', true);
                    }
                }
            }
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', val);
            }
        },
        'items'() {
            for (let j = 0; j < this.value.length; j++) {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    if (this.items[i][this.compareKey] === this.value[j][this.compareKey]) {
                        this.$set(this.items[i], 'checked', true);
                    }
                }
            }
        }
    },
    methods: {
        handleClick(data) {
            // 将对于状态置为对应值
            if (data.checked === true) {
                this.$set(data, 'checked', false);
            } else {
                this.$set(data, 'checked', true);
            }
            const selectData = [];
            for (let i = 0, len = this.items.length; i < len; i++) {
                if (this.items[i].checked === true) {
                    selectData.push(this.items[i]);
                }
            }
            this.$emit('input', selectData);
            // 更新选择数据
            this.getSelectLabels(selectData);
        },
        getSelectLabels(val) {
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', val);
            }
        },
        handleSelectAll() {
            const len = this.items.length;
            let index = 0;
            for (let i = 0, len = this.items.length; i < len; i++) {
                if (this.items[i].checked === true) {
                    index++;
                }
            }
            if (index === len) {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    this.$set(this.items[i], 'checked', false);
                }
                this.$emit('input', []);
            } else {
                for (let i = 0, len = this.items.length; i < len; i++) {
                    this.$set(this.items[i], 'checked', true);
                }
                this.$emit('input', this.items);
            }
            // 更新选择数据
            this.getSelectLabels(this.value);
        }
    }
};
