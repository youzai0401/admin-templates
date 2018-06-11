<template>
    <div class="resource-level-add rewrite-el-tree">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" class="form-wrap"
                 label-position="left">
            <custom-card title="密码修改" class="custom-card-padding-form">
                <el-form-item label="账号" prop="username" required tabindex="-1">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldpassword" required tabindex="-1">
                    <el-input type="password" v-model.number="formData.oldpassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword" required tabindex="-1">
                    <el-input type="password" v-model="formData.newpassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="_newpassword" required tabindex="-1">
                    <el-input type="password" v-model="formData._newpassword"></el-input>
                </el-form-item>
            </custom-card>

            <div class="btn-group-container">
                <el-button type="primary" :loading="isLoad" @click="handleSubmitForm('formData')">{{btnText}}
                </el-button>
                <el-button @click="handleBack">取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

