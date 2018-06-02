<template>
    <div>
        <div v-for="(item, index) in imgList">
            <div class="small-img-container" >
                <img class="small-img" style="max-width: 400px" :src="item.url" alt="" >
                <div class="small-img-mask" @click="handleOpen(index)"></div>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" size="tiny" class="hide-element-dialog-header">
            <img width="100%" :src="imgUrl" alt="" @click="handleClose" class="big-img">
        </el-dialog>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

