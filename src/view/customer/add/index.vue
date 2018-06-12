<template>
    <page :header="header" :title="title">
        <div class="resource-level-add rewrite-el-tree">

            <custom-card title="资料信息" class="custom-card-padding-form">
                <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-width="150px" class="form-wrap"
                         label-position="left">
                    <el-form-item label="姓名" prop="name" required tabindex="-1">
                        <el-input v-model="userInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="identityId" required tabindex="-1">
                        <el-input v-model="userInfo.identityId"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证人像面" prop="cardFront" required tabindex="-1">
                        <upload-img v-model="userInfo.cardFront" :maxCount="1"
                                    :imageAccept="['jpg','png', 'jpeg', 'gif']">
                        </upload-img>
                    </el-form-item>
                    <el-form-item label="身份证背面" prop="cardBack" required tabindex="-1">
                        <upload-img v-model="userInfo.cardBack" :maxCount="1"
                                    :imageAccept="['jpg','png', 'jpeg', 'gif']">
                        </upload-img>
                    </el-form-item>
                    <el-form-item label="人和身份证合照" prop="cardPerson" required tabindex="-1">
                        <upload-img v-model="userInfo.cardPerson" :maxCount="1"
                                    :imageAccept="['jpg','png', 'jpeg', 'gif']">
                        </upload-img>
                    </el-form-item>
                </el-form>
            </custom-card>

            <custom-card title="资料信息" class="custom-card-padding-form">
                <el-form :model="userData" ref="userData" label-width="150px" class="form-wrap"
                         label-position="left">
                    <el-form-item label="借款人手机号" prop="phoneNum" required tabindex="-1">
                        <el-input v-model="userData.phoneNum"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍所在地" prop="permanentAddr" required tabindex="-1">
                        <el-input v-model="userData.permanentAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="住宅类型" prop="houseType" required tabindex="-1">
                        <el-input v-model="userData.houseType"></el-input>
                    </el-form-item>
                    <el-form-item label="住宅地址" prop="houseAddr" required tabindex="-1">
                        <el-input v-model="userData.houseAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="maritalStatus" required tabindex="-1">
                        <el-radio-group v-model="userData.maritalStatus">
                            <el-radio :label="1">已婚</el-radio>
                            <el-radio :label="2">未婚</el-radio>
                            <el-radio :label="0">离异</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="户主名称" prop="houseOwner" required tabindex="-1">
                        <el-input v-model="userData.houseOwner"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="companyName" required tabindex="-1">
                        <el-input v-model="userData.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" prop="companyAddr" required tabindex="-1">
                        <el-input v-model="userData.companyAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="所在部门" prop="sector" required tabindex="-1">
                        <el-input v-model="userData.sector"></el-input>
                    </el-form-item>
                    <el-form-item label="所在职位" prop="position" required tabindex="-1">
                        <el-input v-model="userData.position"></el-input>
                    </el-form-item>
                    <el-form-item label="公司电话" prop="companyPhone" required tabindex="-1">
                        <el-input v-model="userData.companyPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="工龄" prop="jobAge" required tabindex="-1">
                        <el-input v-model="userData.jobAge"></el-input>
                    </el-form-item>
                    <el-form-item label="月收入" prop="incomeMon" required tabindex="-1">
                        <el-input v-model="userData.incomeMon"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍人姓名" prop="introducerName" required tabindex="-1">
                        <el-input v-model="userData.introducerName"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍人电话" prop="introducerPhone" required tabindex="-1">
                        <el-input v-model="userData.introducerPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" required tabindex="-1">
                        <el-input type="textarea" v-model="userData.remark"></el-input>
                    </el-form-item>
                </el-form>
            </custom-card>
            <custom-card title="收款银行卡信息" class="custom-card-padding-form">
                <el-form :model="bankInfo" ref="bankInfo" label-width="150px" class="form-wrap"
                         label-position="left">
                    <el-form-item label="姓名" prop="name" required tabindex="-1">
                        <el-input v-model="bankInfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="identityId" required tabindex="-1">
                        <el-input v-model="bankInfo.identityId"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行地址" prop="bankAddr" required tabindex="-1">
                        <el-input v-model="bankInfo.bankAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="银行账号" prop="account" required tabindex="-1">
                        <el-input v-model="bankInfo.account"></el-input>
                    </el-form-item>
                </el-form>

            </custom-card>
            <custom-card title="联系人信息" class="custom-card-padding-form">
                <Block :list="linkInfo" :max="10">
                    <template slot="item" scope="{item,index}">
                        <el-form :model="item"
                                 :ref="`linkInfo${index}`" label-width="150px"
                                 class="form-wrap"
                                 label-position="left">
                            <el-form-item label="联系人关系" prop="relation" required tabindex="-1">
                                <el-input v-model="item.relation"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人姓名" prop="name" required tabindex="-1">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人手机号" prop="phoneNum" required tabindex="-1">
                                <el-input v-model="item.phoneNum"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人单位" prop="company" required tabindex="-1">
                                <el-input v-model="item.company"></el-input>
                            </el-form-item>
                        </el-form>
                    </template>
                </Block>
            </custom-card>
            <custom-card title="负债信息" class="custom-card-padding-form">
                <Block :list="debtInfo" :max="10">
                    <template slot="item" scope="{item,index}">
                        <el-form :model="item"
                                 :ref="`debtInfo${index}`" label-width="150px"
                                 class="form-wrap block"
                                 label-position="left">
                            <el-form-item label="欠债名称" prop="name" required tabindex="-1">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="额度" prop="value" required tabindex="-1">
                                <el-input v-model="item.value"></el-input>
                            </el-form-item>
                            <el-form-item label="使用额度" prop="useValue" required tabindex="-1">
                                <el-input v-model="item.useValue"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" prop="type" required tabindex="-1">
                                <el-radio-group v-model="item.type">
                                    <el-radio :label="1">银行</el-radio>
                                    <el-radio :label="2">其他</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </template>
                </Block>
            </custom-card>

            <div class="btn-group-container">
                <el-button type="primary" :loading="isLoad" @click="handleSubmitForm('formData')">{{btnText}}
                </el-button>
                <el-button @click="handleBack">取消</el-button>
            </div>
        </div>
    </page>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

