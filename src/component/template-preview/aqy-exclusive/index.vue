<template>
    <div>
        <el-row class="template-item">
            <el-col style="width: 180px">预览图：</el-col>
            <el-col :span="16">
                <img v-for="item in imgList('picurl')" :src="item" alt="" style="max-width: 200px">
            </el-col>
        </el-row>
        <el-row class="template-item">
            <el-col style="width: 180px">是否用右下角弹框：</el-col>
            <el-col :span="16">
                <span>{{showToastWay(templateData.forcetoast)}}</span>
            </el-col>
        </el-row>
        <template v-if="templateData.forcetoast != 1">
            <el-row class="template-item">
                <el-col style="width: 180px">是否展示预览图：</el-col>
                <el-col :span="16">
                    <div>{{templateData.showbrief == 1 ? '展示' : '不展示'}}</div>
                </el-col>
            </el-row>
            <el-row class="template-item" v-if="templateData.showbrief == 1">
                <el-col style="width: 180px">消息预览展示方式：</el-col>
                <el-col :span="16">
                    <span>{{templateData.directshowbrief == 0 ? 'hover显示预览（鼠标移上去后会显示预览图）' : '直接显示预览（与信封同时出现）'}}</span>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col style="width: 180px">消息停留时间：</el-col>
                <el-col :span="16">
                    <span>{{templateData.msgtime == '' ? '永久显示' : templateData.msgtime}}</span>
                    <span v-if="templateData.msgtime !== ''">分</span>
                </el-col>
            </el-row>
        </template>
        <!--爱奇艺-->
        <div>
            <el-row class="template-item">
                <el-col style="width: 180px">执行url：</el-col>
                <el-col :span="16">
                    <span class="break-word">{{templateData.msg_type_object.targeturl}}</span>
                </el-col>
            </el-row>
            <el-row class="template-item">
                <el-col style="width: 180px">是否引导安装应用：</el-col>
                <el-col :span="16">
                    <span>{{templateData.msg_type_object.installcheck === '1' ? '引导安装' : '不引导安装'}}</span>
                </el-col>
            </el-row>
            <template v-if="templateData.msg_type_object.installcheck === '1'">
                <el-row class="template-item">
                    <el-col style="width: 180px">引导安装界面图片：</el-col>
                    <el-col :span="16">
                        <img v-for="(item, index) in templateData.msg_type_object.bigpic" :src="item.url" alt="" style="max-width: 200px" :key="index">
                    </el-col>
                </el-row>
                <el-row class="template-item">
                    <el-col style="width: 180px">引导文案：</el-col>
                    <el-col :span="16">
                        <span>{{templateData.msg_type_object.title}}</span>
                    </el-col>
                </el-row>
            </template>
            <template v-if="templateData.videoDetail">
                <el-row class="template-item">
                    爱奇艺视频信息（辅助审核）
                </el-row>
                <el-row class="template-item">
                    <el-col style="width: 180px">视频名称：</el-col>
                    <el-col :span="16">
                        <span>{{templateData.videoDetail.videoName}}</span>
                    </el-col>
                </el-row>
                <el-row class="template-item">
                    <el-col style="width: 180px">视频分类：</el-col>
                    <el-col :span="16">
                        <span>{{templateData.videoDetail.videoType}}</span>
                    </el-col>
                </el-row>
                <el-row class="template-item">
                    <el-col style="width: 180px">视频预览URL：</el-col>
                    <el-col :span="16">
                        <span>{{templateData.videoDetail.videoUrl}}</span>
                    </el-col>
                </el-row>
            </template>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>