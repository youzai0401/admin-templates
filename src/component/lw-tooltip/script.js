export default {
    props: {
        content: {
            type: String
        },
        maxLength: {
            type: Number
        },
        title: {
            type: String
        }
    },
    created() {

    },
    methods: {
        isShowToolTip() {
            return this.content && this.content.length > this.maxLength;
        },
        // 字段显示过长处理
        /* fn: function */
        longShowSub() {
            console.log(this.maxlength, '-----')
            return this.content.substring(0, this.maxLength) + '...';
        }
    }
};