<template>
    <div :class="[dataSource.child ? '' : 'bbb', 'tree-wrap']" >
        <div class="item-name" v-if="!dataSource.child">{{dataSource.name}}</div>
        <div class="content-wrap" v-if="dataSource.child">
            <div class="group-name">{{dataSource.name}}</div>
            <div :class="[dataSource.child.length === 1 ? 'item-wrap-single' : '' , 'item-wrap']">
                <tree :dataSource="content" v-for='(content, index) in dataSource.child' :key="index"></tree>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @borderColor: #ccc;
    .content-wrap {
        display: flex;
        align-items: center;
    }
    .item-wrap {
        display: flex;
        flex-direction: column;
        .item-wrap {
            border-left: 1px dashed @borderColor;
        }
        .item-wrap-single {
            border-left: 0;
        }
    }
    .group-name {
        display: flex;
        position: relative;
        padding: 10px 10px 10px 0;
        white-space: nowrap;
        align-items: center;
        &:before {
            content: '';
            width: 60px;
            height: 1px;
            border-bottom: 1px dashed @borderColor;
            margin-right: 10px;
        }
    }
    .item-name {
        display: flex;
        position: relative;
        padding: 10px 10px 10px 0;
        white-space: nowrap;
        align-items: center;
        &:before {
            content: '';
            width: 80px;
            height: 1px;
            border-bottom: 1px dashed @borderColor;
            margin-right: 10px;
        }
    }
    .tree-wrap {
        position: relative;
    }
    .tree-wrap .tree-wrap {
        border-left: 1px dashed @borderColor;
    }
    .tree-wrap .tree-wrap.bbb {
        border: 0;
    }
    .tree-wrap .tree-wrap:first-child{
        &:before {
            position: absolute;
            top: 0;
            left: -1px;
            height: 50%;
            width: 1px;
            background-color: #edf0f4;
            content: '';
        }
    }
    .tree-wrap .tree-wrap:last-child {
        &:before {
            position: absolute;
            top: 50%;
            left: -1px;
            height: 50%;
            width: 1px;
            background-color: #edf0f4;
            content: '';
        }
    }
</style>
<script>
    export default{
        name: 'tree',
        props: ['dataSource'],
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
        }
    }
</script>
