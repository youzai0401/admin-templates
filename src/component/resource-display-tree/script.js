

export default{
    name: 'resourceDisplayTree',
    props: {
        dataSource: {
            type: [Array, Object],
            required: true
        }
    },
    data() {
        return {
            msg: 'hello vue'
        };
    },
    components: {},
    mounted() {
        this.$emit('treeLoading');
    }
};