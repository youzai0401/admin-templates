<template>
    <div class="upload-img">
        <el-upload
                ref="upload"
                :action="uploadUrl"
                :name="name"
                :on-remove="handleRemove"
                :file-list="imgList"
                :list-type="listType"
                :on-change="handleChangeUpload"
                :before-upload='handleBeforeUpload'
                :on-success="handleSuccessUpload"
                :on-preview="handlePictureCardPreview"
                :on-progress="handleProgressUpload"
                :on-error="handleUploadError"
                :multiple="multiple"
                :accept="accept"
                :class="{'is-hidden': disabled}">
            <i class="el-icon-plus"></i>
            <div class="element-upload-tips" :class="{'lw-right': imgWidth || fixedWidth || imageAccept !== 1}" @click.stop="">
                上传图片要求：<br/>
                <template v-if="imgWidth">
                    最大尺寸：{{imgWidth}}X{{imgHeight}}px<br/>
                </template>
                <template v-if="fixedWidth">
                    尺寸：{{fixedWidth}}X{{fixedHeight}}px<br/>
                </template>
                大小：{{maxSize}}KB以内<br/>
                 格式：{{acceptText}}<br/>
                限{{maxCount}}张<br/>
                <template v-if="specialRemark">
                    含扫描方式提示文字
                </template>
            </div>
        </el-upload>
        <el-dialog v-model="dialogVisible" class="hide-element-dialog-header re-el-dialog--small">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

