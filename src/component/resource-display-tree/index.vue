<template>
    <div :class="[dataSource.subSimpleNodeList ? (dataSource.subSimpleNodeList.length > 1 ? 'aaa' : 'tree-wrap-single') : '','tree-wrap']">
        <div class="item-name" v-if="!dataSource.subSimpleNodeList">{{dataSource.name}}</div>
        <div class="content-wrap" v-if="dataSource.subSimpleNodeList">
            <div class="group-name"><i :class="'iconStyle'+dataSource.level"></i>{{dataSource.name}}</div>
            <div :class="[dataSource.subSimpleNodeList.length === 1 ? 'item-wrap-single' : '' , 'item-wrap']">
                <resource-display-tree :dataSource="content" v-for='(content, index) in dataSource.subSimpleNodeList' :key="index"></resource-display-tree>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>