<template>
    <page :header="header" :title="title">
        <div class="resource-level-add rewrite-el-tree" v-loading="pageLoad">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" class="form-wrap"
                     label-position="left">
                <custom-card title="产品信息" class="custom-card-padding-form">
                    <el-form-item label="呈现位类型" prop="type" required tabindex="-1">
                        <el-select v-if="!id" v-model="formData.type" placeholder="请选择">
                            <el-option label="push呈现位" value='3'></el-option>
                            <el-option label="视频呈现位" value='2'></el-option>
                            <el-option label="普通呈现位" value='1'></el-option>
                        </el-select>
                        <p v-else>{{resourceLevelStr}}</p>
                    </el-form-item>
                    <el-form-item label="呈现位名称" prop="name" required tabindex="-1">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="呈现位示例图" prop="imageList" required tabindex="-1">
                        <upload-img v-model="formData.imageList" :imageAccept="['jpg','png', 'jpeg', 'gif']">
                        </upload-img>
                    </el-form-item>
                </custom-card>

                <div class="btn-group-container">
                    <el-button type="primary" :loading="isLoad" @click="handleSubmitForm('formData')">{{btnText}}
                    </el-button>
                    <el-button @click="handleBack">取消</el-button>
                </div>
            </el-form>
        </div>
    </page>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

