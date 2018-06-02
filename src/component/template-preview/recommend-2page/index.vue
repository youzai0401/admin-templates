<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 180px">推荐页背景图：</el-col>
            <el-col :span="16">
                <img :src="templateData.page1Img[0].url" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">倒计时：</el-col>
            <el-col :span="16">
                <span>{{templateData.countDown}}</span>s
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">转化页背景图：</el-col>
            <el-col :span="16">
                <img :src="templateData.page2Img[0].url" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">二维码URL：</el-col>
            <el-col :span="16">
                <span>{{templateData.qrCodeURL}}</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">广告角标：</el-col>
            <el-col :span="16">
                <span>{{templateData.adMark === true ? '显示' : '不显示'}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>