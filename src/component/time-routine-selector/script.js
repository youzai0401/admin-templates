export default {
    name: 'timeRoutineSelector',
    props: {
        flags: {
            type: String,
            default: '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
        },
        changed: {
            type: Function
        },
        showFormatValueOnly: {
            type: Boolean,
            default: false
        },
        formatValueMaxLength: {
            type: Number,
            default: 60
        }
    },
    data() {
        this.SELECT_STATUS = {
            SELECTED: 1,
            UNSELECTED: 0
        };
        return {
            routineList: this._getRoutineList(this.$props),
            curTip: '',
            targetStatus: this.SELECT_STATUS.SELECTED,
            isMouseDown: false,
            startId: undefined,
            endId: undefined,
            originRoutineList: {},
            weekDayNames: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
            tipPos: {
                top: 0,
                left: 0
            },
            formatValueZhCn: [],
            resultObj: {}
        };
    },
    mounted() {
        // 渲染初始化后的选中时间和二进制
        this.updateSelectedTimeAndDigit(this.showFormatValueOnly);
    },

    // todo: 暂时不用下面的方法，会造成无限循环，采用watch
    /**
     * 组件更新，更新tip也会触发
     * @private
     */
    // updated() {
        // this.updateSelectedTimeAndDigit();
        // super.componentDidUpdate();
    // },

    methods: {
        _getRoutineList(props = {}) {
            const value = props.flags || '';
            let i = 0;
            let routineList = {};

            // 一天的半小时时间数组，0050表示30分钟，0100表示1小时，0750表示7小时30分，以此类推
            const halfHoursArr = (new Array(48)).join(',').split(',')
                .map((item, index) => 50 * (index + 1));

            // 一个星期的半小时时间对象，星期1至7为10000至70000，每个加上上述48个半小时的数字，构成含7*48 = 336个key的对象
            for (; i < 7; i++) {
                halfHoursArr.forEach((item) => {
                    routineList[item + (i + 1) * 10000] = this.SELECT_STATUS.UNSELECTED;
                });
            }
            this.routineKeys = Object.keys(routineList);

            // 将传入的二进制字符串转为选中态
            if (value) {
                const digitArr = value.split('');
                const selectedStr = this.SELECT_STATUS.SELECTED.toString();
                digitArr.forEach((item, key) => {
                    if (item == selectedStr && this.routineKeys[key]) {
                        routineList[this.routineKeys[key]] = this.SELECT_STATUS.SELECTED;
                    }
                });
            }

            return routineList;
        },




        /**
         * 点下鼠标，开始选择动作，必须在选区内部开始
         * @param {object} event - 事件event对象
         * @return {void}
         * @private
         */
        mouseDown(event) {
            const curId = event.target.getAttribute('data-id');
            if (curId) {
                this.originRoutineList = $.extend(true, {}, this.routineList);
                this.isMouseDown = true;
                this.startId = curId;
                this.endId = curId;
                this.targetStatus = this.SELECT_STATUS.SELECTED - this.originRoutineList[curId];
            }
        },

        /**
         * 鼠标移动，因移动过程中多次渲染，我们只拿mouseDown时的初始克隆的state做渲染运算
         * @param {object} event - 事件event对象
         * @return {void}
         * @private
         */
        mouseMove(event) {
            if (this.isMouseDown === true) {
                const curId = event.target.getAttribute('data-id');
                if (curId && (curId !== this.endId)) {
                    this.endId = curId;
                    this.updateSelection(this.startId, this.endId);
                }
            }
        },

        /**
         * 松开鼠标
         * @private
         */
        mouseUp() {
            if (this.isMouseDown === true) {
                this.endSelection();
            }
        },

        /**
         * 鼠标over时间格子
         * @param {object} event - 事件event对象
         * @return {void}
         * @private
         */
        mouseOver(event) {
            // event.persist(); // 有debounce才需要
            this.updateTip(event);
        },

        /**
         * 离开选区
         * tip显示时，内部移动到tip也算mouseLeave，快速移动可能触发
         * @private
         */
        mouseLeave() {
            if (this.isMouseDown === true) {
                this.endSelection();
            }
            if (this.curTip) {
                this.curTip = '';
            }
        },

        /**
         * 翻译4位数字时间，如1250 => 12:30
         * @param {string} digit - 4位数字字符串
         * @return {string} 翻译后的时间字符串
         * @private
         */
        timeTranslate(digit, symbol) {
            if (digit && digit.length == 4) {
                return digit.replace(/(\d{2})50/, '$130').replace(/(\d{2})(\d{2})/, '$1' + symbol + '$2');
            }
            return digit;
        },

        /**
         * 结束选择动作
         * @private
         */
        endSelection() {
            this.updateSelection(this.startId, this.endId, () => {
                this.updateSelectedTimeAndDigit();
                // 中间过程使用state，结束之后还是要把选中的数据重新重置用value的值显示
                this.routineList = this._getRoutineList(this.resultObj);
                // this.setState({
                //     routineList: this._getRoutineList(this.props)
                // });
            });
            this.originRoutineList = {};
            this.startId = undefined;
            this.endId = undefined;
            this.isMouseDown = false;
        },

        /**
         * 更新当前选择的时间界面
         * @param {string} startId - 起始时间id
         * @param {string} endId - 结束时间id
         * @param {func} cb - 更新完state后的回调函数
         * @return {void}
         * @private
         */
        updateSelection(startId, endId, cb) {
            if (startId && endId) {
                const week = [startId.slice(0, 1) - 0, endId.slice(0, 1) - 0].sort((a, b) => a - b);// 星期起止
                const time = [startId.slice(1) - 0, endId.slice(1) - 0].sort((a, b) => a - b);// 时间起止
                // 得到需要改值的key的数组
                const selectedList = [];
                for (let i = week[0]; i <= week[1]; i++) {
                    for (let j = time[0]; j <= time[1]; j += 50) {
                        selectedList.push(i * 10000 + j);
                    }
                }
                const routineList = $.extend(true, {}, this.originRoutineList);
                selectedList.forEach((item) => {
                    if (routineList[item] != this.targetStatus) {
                        routineList[item] = this.targetStatus;
                    }
                });
                this.routineList = routineList;
                this.$nextTick(function () {
                    if (cb) {
                        cb();
                    }
                })
                // setTimeout(() => {
                //     if (cb) {
                //         cb();
                //     }
                // }, 16);
                // this.setState({
                //     routineList
                // }, () => {
                //     if (cb) {
                //         cb();
                //     }
                // });
            }
        },

        /**
         * 根据当前routineList状态得到选择时间段字符串数组、二进制字符串
         * @param {bool} notCallOnChange=false 是否调用onChange函数
         * @private
         */
        updateSelectedTimeAndDigit(selected) {
            // 渲染选中的时间段
            const retObj = {}; // 结果对象
            let isContinue = false,
                curStart,
                curEnd;
            const selectFlag = selected ? this.SELECT_STATUS.SELECTED : this.SELECT_STATUS.UNSELECTED;
            this.routineKeys.forEach((item, index) => {
                const curWeekIndex = item.slice(0, 1);// 当前星期几的索引
                if (this.routineList[item] === selectFlag) {
                    const curTime = item.slice(1) - 0;
                    if (!isContinue) { // 上个已断
                        curStart = ('0000' + (curTime - 50)).slice(-4); // 若为���数字可能为0
                        curEnd = ('0000' + curTime).slice(-4);
                        isContinue = true;
                    } else { // 延续上一个
                        curEnd = ('0000' + curTime).slice(-4); // 更新结束时间
                    }
                } else {
                    isContinue = false;
                    if (curStart && curEnd) { // 收集时间
                        if (!retObj[curWeekIndex]) {
                            retObj[curWeekIndex] = [];
                        }
                        retObj[curWeekIndex].push([curStart, curEnd]);
                        curStart = undefined;
                        curEnd = undefined;
                    }
                }
                if ((index + 1) % 48 == 0) { // 一天最后的半小时，当前一天有48个半小时
                    if (isContinue) { // 最后半小时已选中，收集时间
                        if (!retObj[curWeekIndex]) {
                            retObj[curWeekIndex] = [];
                        }
                        retObj[curWeekIndex].push([curStart, curEnd]);
                        curStart = undefined;
                        curEnd = undefined;
                        isContinue = false; // 强制结束
                    }
                }
            });

            // 转后端所需格式;
            const formatArr = {};
            for (const i in retObj) {
                if (retObj[i] && retObj[i].length > 0) {
                    const timeArr = retObj[i].map(item => {
                        return item.map(chilrd => {
                            return this.timeTranslate(chilrd, '.');
                        });
                    });
                    if (i == 7) {
                        formatArr[1] = timeArr;
                    } else {
                        formatArr[(Number(i) + 1)] = timeArr;
                    }
                }
            }

            //得出中文时间方法
            const showArr = [];
            for (const i in retObj) {
                if (retObj[i] && retObj[i].length > 0) {
                    const timeArr = retObj[i].map((item) => (
                        this.timeTranslate(item[0], ':') + '-' + this.timeTranslate(item[1], ':')
                    ));
                    const weekShow = this.weekDayNames[i - 1] ? this.weekDayNames[i - 1] : '';
                    const tipShow = weekShow + '：' + timeArr.join('，');
                    showArr.push(tipShow);
                }
            }
            this.formatValueZhCn = showArr;

            // 得到二进制字符串
            const digitsArr = [];
            for (const i in this.routineList) { // 考虑兼容性隐患，暂时不用Object.values()
                if (this.routineList[i] !== undefined) {
                    digitsArr.push(this.routineList[i]);
                }
            }
            const digitsStr = digitsArr.join('');

            // this.props.text = showArr;
            this.resultObj.value = formatArr;
            this.resultObj.flags = digitsStr;

            if (this.$props.changed) {
                this.$props.changed(this.resultObj);
            }
        },

        /**
         * 更新tip内容，确定tip显示位置
         * @param {object} event - 事件event对象
         * @return {void}
         * @private
         */
        updateTip(event) {
            const curId = event.target.getAttribute('data-id');
            const offsetLeft = event.target.offsetLeft;
            const offsetTop = event.target.offsetTop;
            const divideWeekKey = 5;
            const divedeTime = 1800;
            const boxSize = {
                width: 13,
                height: 35
            };
            if (curId) {
                const weekKey = curId.slice(0, 1) - 1;
                const time = curId.slice(1) - 0;
                const startTime = this.timeTranslate((10000 + time - 50).toString().slice(-4), ":");
                const endTime = this.timeTranslate((10000 + time).toString().slice(-4), ":");
                const weekShow = this.weekDayNames[weekKey] ? (this.weekDayNames[weekKey] + ' ') : '';
                const curTip = weekShow + startTime + '-' + endTime;
                let left, top;
                // 确定tip显示位置(右下/左下/右上/左上)
                if (weekKey <= divideWeekKey && time <= divedeTime) {
                    left = offsetLeft + boxSize.width;
                    top = offsetTop + boxSize.height;
                } else if (weekKey <= divideWeekKey && time > divedeTime) {
                    left = offsetLeft - 12 * boxSize.width;
                    top = offsetTop + boxSize.height;
                } else if (weekKey > divideWeekKey && time <= divedeTime) {
                    left = offsetLeft + boxSize.width;
                    top = offsetTop - boxSize.height;
                } else {
                    left = offsetLeft - 12 * boxSize.width;
                    top = offsetTop - boxSize.height;
                }
                this.curTip = curTip;
                this.tipPos = {
                    left: `${left}px`,
                    top: `${top}px`
                };
            }
        },

        /**
         * 清空已选时间
         * @private
         */
        clearSelect() {
            const routineList = $.extend(true, {}, this.routineList);
            this.routineKeys.forEach((item) => {
                routineList[item] = this.SELECT_STATUS.UNSELECTED;
            });
            this.routineList = routineList;
            this.$nextTick(function () {
                this.updateSelectedTimeAndDigit();
            });
        }
    },
    watch: {
        flags() {
            this.routineList = this._getRoutineList(this.$props);
            this.$nextTick(function () {
                this.updateSelectedTimeAndDigit(this.showFormatValueOnly);
            });
        }
    }
};
