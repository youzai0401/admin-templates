<template>
    <div>
        <div v-if="tagGroup.length !== 0">
            <span>热门标签：</span>
            <template v-for="(item, index) in tagGroup">
                <span class="lw-tag" @click="clickTag(item.id)"
                      :class="{'lw-tag-active': selectedPositionId === item.id}">{{item.name}}</span>
            </template>
        </div>
        <div class="lc-select">
            <div class="lc-select-panel">
                <p class="lc-select-panel-header">选择呈现设备</p>
                <div class="lc-select-panel-body">
                    <div class="lc-checkbox-item" v-for="(item, index) in deviceData"
                         @click="handleClickDeviceData(item.deviceId, deviceData, item.deviceId === selectedDeviceId)"
                         :class="{deviceActive:(item.deviceId === selectedDeviceId)}"
                         :key="index">
                        <span class="title">{{item.deviceName}}</span>
                    </div>
                </div>
                <!--<p class="lc-select-panel-footer">efe</p>-->
            </div>
            <div class="lc-select-panel-arrow">
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="lc-select-panel">
                <p class="lc-select-panel-header">选择呈现位置</p>
                <div class="lc-select-panel-body">
                    <div class="lc-checkbox-item" v-for="(item, index) in positionData"
                         @click.self="handleClickPositionData(item.positionId, item.positionId === selectedPositionId)"
                         :class="{positionActive:(item.positionId === selectedPositionId)}"
                         :key="index">
                        <span @click.self="handleClickPositionData(item.positionId)"
                              class="title">{{item.positionName}}</span>
                        <i v-show="item.positionId === selectedPositionId" class="el-icon-check"></i>
                    </div>
                </div>
                <!--<p class="lc-select-panel-footer">efe</p>-->
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

