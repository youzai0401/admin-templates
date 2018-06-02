<template>
    <page :header="header" :title="title">
        <div class="resource-level-check">
            <el-form label-width="150px" class="form-wrap" label-position="left">
                <custom-card title="呈现位基本信息" class="custom-card-padding-form">
                    <el-form-item label="呈现位类型：">
                        <p>{{detailData.type | typeFilter}}</p>
                    </el-form-item>
                    <el-form-item label="呈现位名称：">
                        <p>{{detailData.name}}</p>
                    </el-form-item>
                    <el-form-item label="呈现位示例图：" class="sketch-img-small">
                        <template v-for="item in detailData.imageList">
                            <img :src="item.url" alt="">
                        </template>
                    </el-form-item>
                    <!--<el-form-item v-if="detailData.type === '1'" label="呈现位访问编号" prop="nicheUrl" >-->
                        <!--<p>{{detailData.nicheUrl}}</p>-->
                    <!--</el-form-item>-->
                </custom-card>


                <custom-card title="呈现位关联的范围" class="custom-card-padding-form">
                    <el-form-item label="设备来源：">
                        <p>{{detailData.channelName}}</p>
                    </el-form-item>
                    <el-form-item label="设备来源下的平台：">
                        <p>{{detailData.rootName}}</p>
                    </el-form-item>
                </custom-card>

                <custom-card v-if="detailData.type === '1' && detailData.defaultUrl" title="呈现位默认活动" class="custom-card-padding-form">
                    <el-form-item label="默认活动：">
                        <span class="lw-word-break-all">{{detailData.defaultUrl}}</span>
                    </el-form-item>
                </custom-card>

                <!--<custom-card title="资源位关联范围" class="custom-card-padding-form">
                    &lt;!&ndash;<div class="display-tree-container">&ndash;&gt;
                        &lt;!&ndash;<div :class="[dataSource.length ===1 ? 'content-wrap-single' : '' , 'content-wrap']"&ndash;&gt;
                             &lt;!&ndash;v-for="item in dataSource">&ndash;&gt;
                            &lt;!&ndash;<div class="tree-total">{{item.name}}</div>&ndash;&gt;
                            &lt;!&ndash;<div>&ndash;&gt;
                                &lt;!&ndash;<resource-display-tree :dataSource="content" v-for="(content, index) in item.subSimpleNodeList"&ndash;&gt;
                                                       &lt;!&ndash;:key="index"></resource-display-tree>&ndash;&gt;
                            &lt;!&ndash;</div>&ndash;&gt;
                        &lt;!&ndash;</div>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;
                    <div class="display-tree-container " v-loading="isLoadTree">
                        <div :class="[dataSource.length ===1 ? 'content-wrap-single' : '' , 'content-wrap']"
                             v-for="item in dataSource">
                            <div class="tree-total">{{item.name}}</div>
                            <div :class="[item.subSimpleNodeList.length === 1 ? 'tree-group-single' : '']">
                                <resource-display-tree :dataSource="content" v-for="(content, index) in item.subSimpleNodeList"
                                                       :key="index" v-on:treeLoading="cancelLoading()"></resource-display-tree>
                            </div>
                        </div>
                    </div>
                </custom-card>-->

                <custom-card title="所属呈现位分类" class="custom-card-padding-form">
                    <el-form-item label="呈现位分类：">
                        <p>{{detailData.nicheGroupName}}</p>
                    </el-form-item>
                </custom-card>
                <custom-card title="上下架管理" class="custom-card-padding-form">
                    <el-form-item label="上架状态：">
                        <p>{{detailData.status | statusFilter}}</p>
                    </el-form-item>
                </custom-card>

                <div class="btn-group-container">
                    <el-button @click="handleBack">返回</el-button>
                </div>
            </el-form>
        </div>
    </page>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

