<template>
    <!--工具栏-->
    <div class="lc-select">
        <template v-if="title.length === 1">
            <div class="lc-select-panel">
                <p class="lc-select-panel-header">{{title[0]}}</p>
                <div class="lc-select-panel-body">
                    <div class="lc-checkbox-item" v-for="(item, index) in data" :key="index">
                        <span class="title">{{item.name}}</span>
                        <el-checkbox v-model="item.checked" @change="handleChangeCheck(item,index)"></el-checkbox>
                    </div>
                </div>
                <!--<p class="lc-select-panel-footer">efe</p>-->
            </div>
        </template>
        <template v-if="title.length === 2">
            <div class="lc-select-panel">
                <p class="lc-select-panel-header">{{title[0]}}</p>
                <div class="lc-select-panel-body" @click="isShowSecondPanel = true">
                    <div class="lc-checkbox-item" v-for="(item, index) in data" :key="index" @click="handleClickItem(index)">
                        <i class="el-icon-arrow-right arrow"></i>
                        <span class="title" v-limitword="{limit: 20, val: item.name}"></span>
                        <el-checkbox v-model="item.checked" @change="handleChangeCheck(item,index)" :indeterminate="item.isIndeterminate"></el-checkbox>
                    </div>
                </div>
                <!--<p class="lc-select-panel-footer">efe</p>-->
            </div>
            <transition name="fade">
                <div class="lc-select-panel" v-show="isShowSecondPanel">
                    <p class="lc-select-panel-header">{{title[1]}}</p>
                    <div class="lc-select-panel-body" @click="isShowThirdPanel = true">
                        <div class="lc-checkbox-item" v-for="(item, index) in data2" :key="index">
                            <span class="title" v-limitword="{limit: 20, val: item.name}"></span>
                            <el-checkbox v-model="item.checked" @change="handleChangeCheck(item,index)"></el-checkbox>
                        </div>
                    </div>
                    <!--<p class="lc-select-panel-footer">efe</p>-->
                </div>
            </transition>
        </template>
        <transition name="fade">
            <div class="lc-select-panel" v-show="isShowThirdPanel" >
                <p class="lc-select-panel-header">已选</p>
                <div class="lc-select-panel-body">
                    <div class="lc-checkbox-item" v-for="(item, index) in data3" :key="index">
                        <span class="title" v-limitword="{limit: 20, val: item.name}"></span>
                        <i class="el-icon-circle-cross" @click="handleChangeCheck(item,index, 'del')"></i>
                    </div>
                </div>
                <!--<p class="lc-select-panel-footer">efe</p>-->
            </div>
        </transition>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

