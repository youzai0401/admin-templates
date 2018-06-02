import emitter from 'element-ui/lib/mixins/emitter';
export default {
    props: {
        value: [String, Number],
        items: {
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
            currentValue: this.value
        };
    },
    watch: {
        'value'(val) {
            this.setCurrentValue(val);
        }
    },
    methods: {
        handleClick(value) {
            if (value === this.currentValue) return;
            this.$emit('input', value);
            this.setCurrentValue(value);
        },
        setCurrentValue(value) {
            if (value === this.currentValue) return;
            this.currentValue = value;
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        }
    }
};
