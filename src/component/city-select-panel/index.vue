<template>
    <!--工具栏-->
    <div class="lc-select" v-if="dataSource.length !== 0">
        <div class="lc-select-panel">
            <p class="lc-select-panel-header">选择省级</p>
            <div class="lc-select-panel-body">
                <div class="lc-checkbox-item" v-for="(item, index) in dataSource"
                     @click.self="handleClickProvince(item.id, index)"
                     :key="index">
                    <span @click.self="handleClickProvince(item.id, index)" class="title">{{item.name}}</span>
                    <el-checkbox :indeterminate="item.isIndeterminate"
                                 @change="handleClickProvince(item.id, index, item.isChecked)"
                                 v-model="item.isChecked"></el-checkbox>
                </div>
            </div>
            <!--<p class="lc-select-panel-footer">efe</p>-->
        </div>
        <div class="lc-select-panel">
            <p class="lc-select-panel-header">选择市级</p>
            <div class="lc-select-panel-body">
                <div class="lc-checkbox-item" v-for="(item, index) in citySource.childNodes"
                     @click.self="handleClickCity(item.id, index, item.isChecked, citySource.id)"
                     :key="index">
                    <span @click.self="handleClickCity(item.id, index, item.isChecked, citySource.id)" class="title">{{item.name}}</span>
                    <el-checkbox @change="handleClickCity(item.id, index, !item.isChecked, citySource.id)" v-model="item.isChecked"></el-checkbox>
                </div>
            </div>
            <!--<p class="lc-select-panel-footer">efe</p>-->
        </div>
        <div class="lc-select-panel">
            <p class="lc-select-panel-header">已选地域</p>
            <div class="lc-select-panel-body">
                <div class="lc-checkbox-item" v-for="(item, index) in selectedCityData" :key="index">
                    <span class="title">{{item.name}}</span>
                    <i class="el-icon-circle-cross" @click="handleDeleteData(item)"></i>
                </div>
            </div>
            <!--<p class="lc-select-panel-footer">efe</p>-->
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

