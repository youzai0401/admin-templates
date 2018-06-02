<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 180px">引导图：</el-col>
            <el-col :span="16">
                <img v-for="item in imgList('guideImg')" :src="item" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">引导页倒计时：</el-col>
            <el-col :span="16">
                <span>{{templateData.countDown}}</span>s
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">问题背景图：</el-col>
            <el-col :span="16">
                <img v-for="item in imgList('questionImg')" :src="item" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item" v-for="item in templateData.optionArray" :key="item.key">
            <el-col style="width: 180px">{{item.label}}：</el-col>
            <el-col :span="16">
                <div>{{item.content}}</div>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">正确选项：</el-col>
            <el-col :span="16">
                <span>{{correctAnswerOption}}</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">选中按钮及文字颜色：</el-col>
            <el-col :span="16">
                <span :style="{'background-color': showColor('chooseButtonColor'), padding: '8px', color: showColor('chooseTextColor')}">选中文字</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">未选中按钮及文字颜色：</el-col>
            <el-col :span="16">
                <span :style="{'background-color': showColor('unChooseButtonColor'), padding: '8px', color: showColor('unChooseTextColor')}">选中文字</span>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">是否有奖品：</el-col>
            <el-col :span="16">
                <span>{{templateData.hasGift === 1 ? '是' : '否'}}</span>
            </el-col>
        </el-row>
        <div>
            <el-row class="template-item">
                <el-col style="width: 180px">正确答案礼品图片：</el-col>
                <el-col :span="16">
                    <div>
                        <img v-for="item in imgList('giftImgOfYes')" :src="item" alt="" style="max-width: 200px">
                    </div>
                </el-col>
            </el-row>
            <el-row class="template-item" v-if="templateData.hasGift === 1">
                <el-col style="width: 180px">正确答案的二维码URL：</el-col>
                <el-col :span="16">
                    <span>{{templateData.qrCodeURLOfYes}}</span>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col style="width: 180px">错误答案礼品图片：</el-col>
                <el-col :span="16">
                    <div>
                        <img v-for="item in imgList('giftImgOfNo')" :src="item" alt="" style="max-width: 200px">
                    </div>
                </el-col>
            </el-row>
            <el-row class="template-item" v-if="templateData.hasGift === 1">
                <el-col style="width: 180px">错误答案的二维码URL：</el-col>
                <el-col :span="16">
                    <span>{{templateData.qrCodeURLOfNo}}</span>
                </el-col>
            </el-row>
        </div>
        <!--<div v-if="templateData.hasGift === 0">
            <el-row class="template-item">
                <el-col :span="5">无奖品的正确礼品图片</el-col>
                <el-col :span="19">
                    <div>
                        <img v-for="item in imgList('unGiftImgOfYes')" :src="item" alt="">
                    </div>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col :span="5">无奖品的错误礼品图片</el-col>
                <el-col :span="19">
                    <div>
                        <img v-for="item in imgList('unGiftImgOfNo')" :src="item" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>-->
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