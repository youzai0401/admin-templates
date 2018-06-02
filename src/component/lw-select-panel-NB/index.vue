<template>
    <!--工具栏-->
    <div>
        <div class="lw-hot-tag-container">
            <div class="lw-hot-tag-title">
                <span >热门标签</span>
            </div>
            <div class="lw-tag">
                <span v-for="(item, index) in hotDataLS" :key="index"
                    :class="item.selected ? 'lw-tag-active' : ''"
                    @click="handleHotClick(item.selected, item.value, item.ids, index)">{{item.name}}<i
                    v-show="item.selected" class="el-icon-check"></i></span>
            </div>
        </div>
        <!--==={{newIsShowContent}}===-->
        <div class="select-panel-show-title">
            <span class="show-more-title">专业选择</span>
            <span @click="showContent" class="show-or-hide">
                <span v-show="!newIsShowContent">展开</span>
                <span v-show="newIsShowContent">收起</span>
                <i class="el-icon-arrow-down" style="font-size: 12px" :class="{'rotate-arrow': newIsShowContent}"></i>
            </span>
        </div>
        <transition name="fade">
            <div v-show="newIsShowContent">
                <slot></slot>
            </div>
        </transition>
        <div>
            <!--<el-tag v-for="item in hotDataLS" closable @close="handleClose">{{item.name}}</el-tag>-->
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

