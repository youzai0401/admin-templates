import server from '../../api/audit-management/audit-preview';

export default {
    props: {
        activityId: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            auditList: [],
            activityProcessData: '',
            displayStyleBoolean: [],
            getDataSuccess: false
        };
    },
    async mounted() {
        /* 获取资源位集合id即nicheGroupId*/
        // const nicheGroupId = this.nicheGroupId;
        /* 获取workflowId*/
        // const nicheGroup = await server.getWorkflowId(nicheGroupId);
        // debugger;
        // const flowId = nicheGroup.data.data.flowId;
        /* 获取活动流程进度*/
        if (this.activityId === 'noActivityId') {
            this.displayStyleBoolean = [true, [false], false, false, false];
            this.$emit('getProgressData', this.displayStyleBoolean);
            this.getDataSuccess = true;
        } else {
            const workflowRes = await server.getNewActivityProcess(this.activityId);
            this.activityProcessData = workflowRes.data.data;
            this.renderAuditLevels();
        }
    },
    methods: {
        renderAuditLevels() {
            // 获取到当前激活id
            const currentStepId = this.activityProcessData.activeNode.id;
            // const currentStepId = 90;
            const workflowList = this.activityProcessData.workflowNew.workflowNodeList;
            if (workflowList[1].childrenNode.length !== 0) {
                for (let i = 1, len = workflowList[1].childrenNode.length + 1; i < len; i++) {
                    this.auditList.push(`${i}级审核`);
                }
                console.log(workflowList[1].childrenNode);
                console.log(this.auditList);
            }
            const initStyleData = [];
            for (let i = 0; i < workflowList.length; i++) {
                // initStyleData.push();
                if (workflowList[i].childrenNode.length !== 0) {
                    if (currentStepId === workflowList[i].id) {
                        initStyleData.push([true]);
                    } else {
                        initStyleData.push([false]);
                    }
                    for (let j = 0; j < workflowList[i].childrenNode.length; j++) {
                        if (currentStepId === workflowList[i].childrenNode[j].id) {
                            initStyleData[i].push(true);
                        } else {
                            initStyleData[i].push(false);
                        }
                    }
                } else {
                    if (currentStepId === workflowList[i].id) {
                        initStyleData.push(true);
                    } else {
                        initStyleData.push(false);
                    }
                }
            }
            console.log('初始化样式数据1', initStyleData);
            this.displayStyleBoolean = this.dealStyleData(initStyleData);
            console.log('初始化样式数据2', this.displayStyleBoolean);
            this.$emit('getProgressData', this.displayStyleBoolean);
            this.getDataSuccess = true;
            // let key;
            // const setKey = (o, index) => {
            //     for (const i in o) {
            //         if (typeof o[i] === 'object' && o[i] !== null) {
            //             setKey(o[i], index);
            //         } else {
            //             if (o.id === id) {
            //                 return key = index;
            //             }
            //         }
            //     }
            // };
            // workflowList.forEach((item, index) => {
            //     setKey(item, index);
            // });
            // console.log('key:', key);
            // this.lightParentNode = key + 1;
            // const processData = workflowList[key];
            // const setDetailData = (o, c) => {
            //     const obj = {};
            //     for (const i in o) {
            //         if (typeof o[i] === 'object' && o[i] !== null) {
            //             if (o.id === id) {
            //
            //             } else {
            //                 setDetailData(o[i], c);
            //             }
            //
            //         } else {
            //             console.log(o.id)
            //             obj[i] = o[i];
            //
            //         }
            //     }
            //     if (JSON.stringify(obj) !== '{}') {
            //         console.log(obj);
            //         c.push(obj);
            //     }
            // };
            // // const detailData = [];
            // // setDetailData(processData, detailData);
            // setDetailData(processData, this.lightAuditList);
            // if (this.lightAuditList > 1) {
            //
            // }
            // console.log('detailData:', this.lightAuditList);
        },
        // 处理样式数据
        dealStyleData(data) {
            for (let i = 0; i < data.length; i++) {
                // debugger;
                if (typeof data[i] === 'boolean') {
                    if (data[i] === true) {
                        return data;
                    } else {
                        data[i] = true;
                    }
                } else {
                    for (let j = 0; j < data[i].length; j++) {
                        if (data[i][j] === true) {
                            return data;
                        } else {
                            data[i][j] = true;
                        }
                    }
                }
            }
        }
    }
};
