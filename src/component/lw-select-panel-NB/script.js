export default {
    props: {
        hotData: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        isShowContent: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hotDataLS: [],
            newIsShowContent: this.isShowContent
        };
    },
    computed: {
    },
    created() {
        this.hotDataLS = this.newHotData();
    },
    watch: {
        'data'(val) {
            this.setTag(val);
            // console.log('val:::', val);
        },
        'hotData'() {
            this.hotDataLS = this.newHotData();
        },
        'isShowContent'() {
            this.newIsShowContent = this.isShowContent;
        }
    },
    methods: {
        showContent() {
            if (this.newIsShowContent) {
                this.newIsShowContent = false;
            } else {
                this.newIsShowContent = true;
            }
            // console.log(this.isShowContent);
        },
        handleHotClick(isT, value, ids, index) {
            let data = [...this.data];
            if (!isT) {
                data = data.concat(value);

                const set = data.reduce(
                    (set, item) => {
                        set[item.id] = item;
                        return set;
                    }, {});
                data = Object.keys(set).map(key => set[key]);

            } else {
                data = data.filter(item => !ids.includes(item.id));
                // console.log('data11111111:::', data);
            }
            this.hotDataLS[index].selected = !isT;
            this.$emit('handleSetData', data, ids, isT);
        },
        handleClose() {
            // console.log(11111111);
        },
        setTag(val) {
            const newHotData = this.newHotData();
            // console.log(newHotData);
            val.forEach(item => {
                newHotData.forEach(t => {
                    if (t.ids.indexOf(item.id) !== -1) {
                        t.selectedCount++;
                        // console.log(t);
                        if (t.selectedCount === t.ids.length) {
                            t.selected = true;
                            // console.log(`${t.name}全部选中了啊啊啊啊啊`);
                        }
                    }
                });
            });
            this.hotDataLS = newHotData;
            // console.log('this.hotDataLS::', this.hotDataLS);
        },
        newHotData() {
            const newHotData = [...this.hotData];
            newHotData.forEach(item => {
                const ids = [];
                item.value.forEach(t => {
                    ids.push(t.id);
                });
                item.selected = false;
                item.selectedCount = 0;
                item.ids = ids;
            });

            return newHotData;
        },
        getColor(isT) {
            if (isT) {
                return '#000';
            } else {
                return '#eee';
            }
        }
    }
};
