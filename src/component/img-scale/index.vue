<template>
    <img class="big-img" :src="url" alt="" v-if="imgScale" @click="handleImgScale(1)">
    <img class="small-img" :src="url" alt="" v-else @click="handleImgScale(0)">
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

