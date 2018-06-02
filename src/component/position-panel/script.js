import emitter from 'element-ui/lib/mixins/emitter';
import deepCopy from 'deepcopy';

export default {
    props: {
        tagGroup: {
            type: Array,
            default: []
        },
        validateEvent: {
            type: Boolean,
            default: false
        },
        originData: {
            type: Array,
            required: true
        },
        title: {
            type: Array,
            required: true
        }
    },
    mixins: [emitter],
    data() {
        return {
            positionData: []
        };
    },
    computed: {

    },
    watch: {
        'deviceData'() {
            const data = deepCopy(this.originData);
            return data;
        }
    },
    created() {
    },
    mounted() {
        // this.dataSource = this.getProcessedDataSource(this.initData);
    },
    methods: {
        clickTag(id) {
            const data = this.deviceData;
            this.selectedPositionId = id;
            if (data.length !== 0) {
                for (let i = 0, len = data.length; i < len; i++) {
                    for (let j = 0, jLen = data[i].devicePosition.length; j < jLen; j++) {
                        if (data[i].devicePosition[j].positionId === id) {
                            this.selectedDeviceId = data[i].deviceId;
                            this.positionData = data[i].devicePosition;
                        }
                    }
                }
            }
        },
        handleClickDeviceData(deviceId, deviceData, isClickSame) {
            if (!isClickSame) {
                console.log('deviceId', deviceId);
                this.selectedDeviceId = deviceId;
                this.selectedPositionId = '';
                for (let i = 0, len = deviceData.length; i < len; i++) {
                    if (deviceData[i].deviceId === deviceId) {
                        this.positionData = deviceData[i].devicePosition;
                        break;
                    }
                }
            }
        },
        handleClickPositionData(positionId, isclickSame) {
            if (!isclickSame) {
                this.selectedPositionId = positionId;
                console.log('positionId:', positionId);
                // 获取相应数据
                // this.handleGetResourceData(this.selectedDeviceId, this.selectedPositionId);
                console.log(this.selectedDeviceId, this.selectedPositionId);
            }
        },
    }
};
