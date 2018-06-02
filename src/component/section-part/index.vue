<template>
    <div class="section-part-wrap">
        <div class="part-top-bar">
            <h1 class="part-title">{{partTitle}}</h1>
            <el-tooltip v-if="isShowToolTip" placement="right-start" effect="light" popper-class="tool-tip-wrap operational-analysis" :visible-arrow="false">
                <div class="tool-tip-content-wrap" slot="content">
                    <slot name="tipContent"></slot>
                </div>
                <!--<img class="top-bar-tip-icon" src="./icon-question.png" alt="问号">-->
                <i class="iconfont icon-wenhao top-bar-tip-icon"></i>
            </el-tooltip>
            <div class="part-select-wrap">
                <slot name="operation-options"></slot>
            </div>
        </div>
        <div class="content-wrap">
            <slot name="content">主要内容</slot>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>