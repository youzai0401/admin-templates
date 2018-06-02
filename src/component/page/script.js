import imgUrl from './img/title1.png';
export default {
    props: {
        header: {
            type: Array
        },
        title: {
            type: String
        },
        imgUrl: {
            type: String,
            default: imgUrl
        },
        btnText: {
            type: String
        },
        btnPower: {
            type: Object,
            default() {
                return {
                    name: '',
                    power: false
                };
            }
        },
        click: {
            type: Function
        },
        paddingBottom: {
            type: Number
        }
    },
    data() {
        return {
            minHeight: ''
        };
    },
    created() {
        this.minHeight = window.innerHeight - 50 + 'px';
    },
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
};
