<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 180px">问题背景图：</el-col>
            <el-col :span="16">
                <img v-for="(item, index) in imgList('questionImgList')" :src="item" alt="" :key="index" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item" v-for="(item, index) in templateData.options" :key="index">
            <el-col style="width: 180px">{{'选项' + (index + 1)}}：</el-col>
            <el-col :span="16">
                <div>{{item.answer}}</div>
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">倒计时：</el-col>
            <el-col :span="16">
                <span>{{templateData.countDown}}</span>s
            </el-col>
        </el-row>
        <el-row class="template-item" v-for="(item, index) in templateData.options" :key="index">
            <el-col style="width: 180px">{{'基础数据选项' + (index + 1)}}：</el-col>
            <el-col :span="16">
                <div>{{item.probability}}</div>
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
            <el-col style="width: 180px">统计背景图：</el-col>
            <el-col :span="16">
                <img v-for="(item, index) in imgList('statisticsImgList')" :src="item" alt="" :key="index" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">是否有奖品：</el-col>
            <el-col :span="16">
                <span>{{templateData.award === 'true' ? '是' : '否'}}</span>
            </el-col>
        </el-row>
        <div v-if="templateData.award === 'true'">
            <el-row class="template-item">
                <el-col style="width: 180px">按钮图片：</el-col>
                <el-col :span="16">
                    <div>
                        <img v-for="item in imgList('buttonImgList')" :src="item" alt="" style="max-width: 200px">
                    </div>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col style="width: 180px">礼品图片：</el-col>
                <el-col :span="16">
                    <div>
                        <img v-for="item in imgList('prizeImgList')" :src="item" alt="" style="max-width: 200px">
                    </div>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col style="width: 180px">二维码URL：</el-col>
                <el-col :span="16">
                    <span>{{templateData.prizeQrCodeUrl}}</span>
                </el-col>
            </el-row>

        </div>

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