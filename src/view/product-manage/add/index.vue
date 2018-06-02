<template>
    <page :header="header" :title="title">
        <div class="resource-level-add rewrite-el-tree" v-loading="pageLoad">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" class="form-wrap"
                     label-position="left">
                <custom-card title="呈现位基本信息" class="custom-card-padding-form">
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
                    <transition name="fade">
                        <!--<el-form-item label="呈现位访问位置" prop="nicheUrl" v-if="formData.type === '1'" required tabindex="-1">-->
                            <!--<el-input v-model="formData.nicheUrl"></el-input>-->
                            <!--<p class="form-tips">此为资源位与前台展示位之间的联系，若不填写，则自动生成固定的访问地址</p>-->
                        <!--</el-form-item>-->
                        <el-form-item label="呈现位访问编号" prop="nicheUrl" v-if="!id && formData.type === '1'" tabindex="-1">
                            <el-input v-model="formData.nicheUrl" :disabled="id && originalType == 1"></el-input>
                            <p class="form-tips">此为呈现位与前台展示位置之间的联系</p>
                        </el-form-item>
                        <!--<el-form-item label="呈现位访问位置" prop="nicheUrl" v-if="formData.type === '1'" tabindex="-1">-->
                            <!--<el-select v-model="formData.nicheUrl" placeholder="请选择" :disabled="id && originalType == 1">-->
                                <!--<el-option label="PC 开机助手弹窗呈现位" value='3'></el-option>-->
                                <!--<el-option label="PC 开机弹窗呈现位" value='2'></el-option>-->
                                <!--<el-option label="PC 唤醒弹窗呈现位" value='1'></el-option>-->
                            <!--</el-select>-->
                            <!--<p class="form-tips">此为资源位与前台展示位之间的联系，若不填写，则自动生成固定的访问地址</p>-->
                        <!--</el-form-item>-->

                    </transition>
                </custom-card>

                <custom-card title="呈现位关联的范围" class="custom-card-padding-form">
                    <el-form-item label="设备来源" prop="channelId" required tabindex="-1">
                        <el-select v-model="formData.channelId" @change="getResourceData(formData.channelId, 'dataChange')" placeholder="请选择">
                            <!--<el-option label="联想自有渠道" :value=1></el-option>-->
                            <!--<el-option label="百事通渠道" :value=2></el-option>-->
                            <el-option
                                    v-for="item in channelItems"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <transition name="fade">
                        <div class="form-in-box" v-if="formData.channelId">
                            <el-form-item label="设备来源下的平台" prop="rootId" required tabindex="-1">
                                <!--<el-select v-model="formData.area[0].rootId" @change="handleGetTreeData" placeholder="请选择">-->
                                <el-select v-model="formData.rootId" placeholder="请选择">
                                    <!--<el-option label="TV" :value=1></el-option>-->
                                    <!--<el-option label="PC" :value=2></el-option>-->
                                    <el-option
                                            v-for="item in resourceItems"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--
                            <el-form-item v-show="formData.area[0].rootId" label="支持的渠道" prop="area[0].ids" required tabindex="-1">
                                <el-tree
                                        ref="tree"
                                        :data="treeData"
                                        :show-checkbox="true"
                                        node-key="id"
                                        :indent=26
                                        :accordion="true"
                                        :default-checked-keys="[]"
                                        :props="defaultProps"
                                        @check-change="handleCheckChange">
                                </el-tree>
                            </el-form-item>
                            -->
                        </div>
                    </transition>
                </custom-card>

                <transition name="fade">
                    <custom-card title="呈现位默认活动" class="custom-card-padding-form"  v-if="formData.type === '1'">
                        <el-form-item label="默认活动" prop="defaultUrl" required tabindex="-1">
                            <el-input v-model="formData.defaultUrl"></el-input>
                        </el-form-item>
                    </custom-card>
                </transition>

                <custom-card title="所属呈现位分类" class="custom-card-padding-form">
                    <el-form-item label="呈现位分类" prop="status" required tabindex="-1">
                        <el-select v-model="formData.nicheGroupId" placeholder="请选择">
                            <!--<el-option label="TV" :value=1></el-option>-->
                            <!--<el-option label="PC" :value=2></el-option>-->
                            <el-option
                                    v-for="item in nicheGroup"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <p class="form-tips">归属于哪个组织，该组织将具有审核该呈现位活动的权限</p>
                    </el-form-item>
                </custom-card>
                <custom-card title="上下架管理" class="custom-card-padding-form">
                    <el-form-item label="上架状态" prop="status" required tabindex="-1">
                        <el-radio-group v-model="formData.status">
                            <el-radio :label='1'>上架</el-radio>
                            <el-radio :label='2'>下架</el-radio>
                        </el-radio-group>
                        <p class="form-tips">注：上架后将在相应的渠道下显示</p>
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

