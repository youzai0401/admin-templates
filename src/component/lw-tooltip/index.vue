<template>
    <div>
        <span v-if="title">{{title}}</span>
        <el-tooltip popper-class="tip-wrap" v-if="isShowToolTip()"
                    effect="light" placement="top-start">
            <div slot="content" class="tip-content-overflow-auto"><span v-if="title">{{title}}</span>{{content}}</div>
            <span>{{longShowSub()}}</span>
        </el-tooltip>
        <span v-else="">{{content || '暂无'}}</span>
    </div>
</template>
<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>