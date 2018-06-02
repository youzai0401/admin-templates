<template>
    <div class="card-container mgn-bottom20" :style="{width: width + '%'}" :class="{'add-shadow': addShadow}">
        <div class="hd-out" v-if="title">
            <div class="hd">
                <img src="./imgs/title-l-2.png" width="63" class="icon-l"/>
                <span>{{title}}</span>
                <img src="./imgs/title-r-2.png" width="64" class="icon-r"/>
            </div>
        </div>
        <div class="bd">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>