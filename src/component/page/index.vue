<template>
    <div class="page" :style="{'min-height': minHeight}">
        <div class="bread-crumb-container" v-if="header">
            <el-breadcrumb separator=">">
                <template v-for="item in header">
                    <el-breadcrumb-item v-if="item.path" :to="{ path: item.path }">{{item.title}}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-else class="last-breadcrumb-item">{{item.title}}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div class="title-container" v-if="title">
            <!--<img :src="imgUrl" alt="">-->
            <span class="title">{{title}}</span>
            <!--<img :src="imgUrl" alt="" style="visibility: hidden;">-->
            <el-button type="primary" v-if="btnText" @click="handleClick" class="btn">
                {{btnText}}
            </el-button>
        </div>
        <div class="container" :style="{'padding-bottom': `${paddingBottom}px`}">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

