<template>
    <div class="login">
        <div class="form-container">
            <div class="form-container-title">登录</div>
            <div class="form-content login-wrap el-col-24">
                <el-form :model="formData" :rules="rules" ref="formData" label-position="left"
                         :change="validateBtn()"
                         label-width="0px">
                    <el-form-item prop="username" class="input-icon-container">
                        <el-input type="text" v-model="formData.username" auto-complete="off" size="large"
                                  placeholder="账号"></el-input>
                        <i class="icon-zhanghao iconfont"></i>
                    </el-form-item>
                    <el-form-item prop="password" class="input-icon-container">
                        <el-input type="password" v-model="formData.password" auto-complete="off" size="large"
                                  placeholder="密码"></el-input>
                        <i class="icon-mima iconfont"></i>
                    </el-form-item>
                    <!--<el-form-item prop="authCode" style="margin-bottom: 10px">-->
                    <!--<el-input class="item-code inp-v" type="text" v-model="formData.authCode"-->
                    <!--auto-complete="off" size="large"-->
                    <!--placeholder="验证码" style="width: 65%"></el-input>-->
                    <!--<img class="item-code-img" @click="handleReloadCode" :src="getCodePath" alt="">-->
                    <!--</el-form-item>-->
                    <!--<el-form-item prop="isRemember">-->
                    <!--<el-checkbox v-model="formData.rememberMe" style="color: #445771;margin-top: 18px;">30天内免登录-->
                    <!--</el-checkbox>-->
                    <!--</el-form-item>-->
                    <el-form-item style="width:100%;">
                        <el-button type="primary"
                                   :disabled="disable"
                                   style="width:100%;"
                                   @click.native.prevent="handleSubmit"
                                   size="large"
                                   :class="[{'btn-n':disable},{'btn-s':!disable}]"
                                   :loading="logining">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

