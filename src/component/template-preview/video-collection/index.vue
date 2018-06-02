<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 180px">视频名称：</el-col>
            <el-col :span="16">
                <span>{{templateData.videoName}}</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">播放集数：</el-col>
            <el-col :span="16">
                <span>{{templateData.posDetail}}</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">视频封面：</el-col>
            <el-col :span="16">
                <img :src="templateData.imgList[0].url" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">倒计时：</el-col>
            <el-col :span="16">
                <span>{{templateData.countDown}}</span>s
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">广告角标：</el-col>
            <el-col :span="16">
                <span>{{templateData.adMark === 1 ? '显示' : '不显示'}}</span>
            </el-col>
        </el-row>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>