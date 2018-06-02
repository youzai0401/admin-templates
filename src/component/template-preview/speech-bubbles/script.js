/**
 * Created by xiaojiang on 2017/10/20.
 */
export default {
    props: {
        templateData: ''
    },
    computed: {
        resultOneImgList() {
            const resultOneImgList = [];
            this.templateData.result[0].resultImgList.forEach(item => {
                // console.log(item,'LLLLLLLLLLLLLLLLLLLLLLLLL');
                if (item.url) {
                    resultOneImgList.push(item.url);
                }
            });
            return resultOneImgList;
        },
        resultTwoImgList() {
            const resultTwoImgList = [];
            this.templateData.result[1].resultImgList.forEach(item => {
                if (item.url) {
                    resultTwoImgList.push(item.url);
                }
            });
            return resultTwoImgList;
        },
        avatarAImgList() {
            const avatarAImgList = [];
            this.templateData.styleConfig.avatarAImgList.forEach(item => {
                if (item.url) {
                    avatarAImgList.push(item.url);
                }
            });
            return avatarAImgList;
        },
        avatarBImgList() {
            const avatarBImgList = [];
            this.templateData.styleConfig.avatarBImgList.forEach(item => {
                if (item.url) {
                    avatarBImgList.push(item.url);
                }
            });
            return avatarBImgList;
        },
        bubblesHasPrize() {
            return this.templateData.hasPrize;
        },
        hasPrize() {
            const hasPrize = this.templateData.hasPrize === 1 ? '是' : '否';
            return hasPrize;
        },
        adMark() {
            const adMark = this.templateData.adMark === 1 ? '显示' : '不显示';
            return adMark;
        },
        chooseBubbleAColor() {
            const chooseBubbleAColor = '#' + this.templateData.styleConfig.chooseBubbleAColor;
            return chooseBubbleAColor;
        },
        chooseBubbleBColor() {
            const chooseBubbleBColor = '#' + this.templateData.styleConfig.chooseBubbleBColor;
            return chooseBubbleBColor;
        }
        //
    },
    methods: {
        convertBubbles(i) {
            const w = ['A', 'B'];
            if (i % 2 === 0) {
                return '气泡' + w[0] + '-' + (i + 1);
            } else {
                return '气泡' + w[1] + '-' + (i + 1);
            }
        },
        // 图片数组 type为不同图片对应的字段key
        imgList(type) {
            const imgArr = [];
            this.templateData[type].forEach(item => {
                imgArr.push(item.url);
            });
            console.log('imgArr===============', imgArr);
            return imgArr;
        },
        // 颜色方法
        showColor(type) {
            return '#' + this.templateData[type];
        }
    }
};