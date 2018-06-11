<template>
    <page :header="header" :title="title">
        <div class="resource-level-add rewrite-el-tree">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" class="form-wrap"
                     label-position="left">
                <custom-card title="产品信息" class="custom-card-padding-form">
                    <el-form-item label="名称" prop="name" required tabindex="-1">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="rank" required tabindex="-1">
                        <el-input v-model.number="formData.rank"></el-input>
                    </el-form-item>
                    <el-form-item label="利率" prop="rate" required tabindex="-1">
                        <el-input v-model="formData.rate"></el-input>
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

