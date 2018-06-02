export default {
    props: {
        imgList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            imgUrl: '',
            isDisplay: 'none',
            dialogVisible: false
        };
    },
    async mounted() {
        // console.log(this.url);
    },
    methods: {
        handleOpen(index) {
            this.imgUrl = this.imgList[index].url;
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        }
    }
};
