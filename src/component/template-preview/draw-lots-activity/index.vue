<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 167px">引导图：</el-col>
            <el-col :span="16">
                <div class="border-container bottom-grid-20">
                    <p>活动提示背景图：</p>
                    <img :src="templateData.introActivityTipBg[0].url" alt="" style="max-width: 200px">
                    <p>签筒图：</p>
                    <img :src="templateData.introLotPotImg[0].url" alt="" style="max-width: 200px">
                    <p>引导图倒计时：&nbsp;{{templateData.countDown}}</p>
                </div>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 167px">摇签配置：</el-col>
            <el-col :span="16">
                <div class="border-container bottom-grid-20">
                    <p>竹签图：</p>
                    <img :src="templateData.bambooSticksImg[0].url" alt="" style="max-width: 200px">
                    <p>签筒图：</p>
                    <img :src="templateData.bambooLotPotImg[0].url" alt="" style="max-width: 200px">
                    <p>ok键配图：</p>
                    <img :src="templateData.okImg[0].url" alt="" style="max-width: 200px">
                    <p>中签背景：</p>
                    <img :src="templateData.drawResultBg[0].url" alt="" style="max-width: 200px">
                </div>
            </el-col>
        </el-row>
        <template v-for="(item,index) in templateData.drawResultConfig">
            <el-row class="template-item">
                <el-col style="width: 167px">中签结果配置{{index + 1}}：</el-col>
                <el-col :span="16">
                    <div class="border-container bottom-grid-20">
                        <p>中签样式：</p>
                        <img :src="item.drawResultStyleImg[0].url" alt="" style="max-width: 200px">
                        <p>中签注解：</p>
                        <img :src="item.drawResultAnnotation[0].url" alt="" style="max-width: 200px">
                        <p>中奖概率：&nbsp;&nbsp;{{item.drawResultPercent}}%</p>
                        <p>奖品URL：&nbsp;&nbsp;{{item.drawPrizeUrl}}</p>
                    </div>
                </el-col>
            </el-row>
        </template>

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