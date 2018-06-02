export default {
    props: {
        url: {
            type: [String],
            required: true
        }
    },
    data() {
        return {
            imgScale: false
        };
    },
    async mounted() {
        console.log(this.url);
    },
    methods: {
        handleImgScale(isScale) {
            if (isScale) {
                this.imgScale = false;
            } else {
                this.imgScale = true;
            }
        }
    }
};
