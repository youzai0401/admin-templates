<template>
    <!--工具栏-->
    <page :title="title" :btnText="btnText" @click="toPath">
        <div>
            <!--工具条-->
            <el-row :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item label="呈现位名称">
                        <el-input placeholder="" v-model="paramsData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input placeholder="" v-model="paramsData.creatorName"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="paramsData.status" placeholder="">
                            <el-option label="全部" :value=0></el-option>
                            <el-option label="上架" :value=1></el-option>
                            <el-option label="下架" :value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-button @click="handleReset">重置</el-button>-->
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form>
            </el-row>
            <!--// 表单-->
            <custom-card :width="100" class="custom-card-padding-table">
                <el-table :data="tableData" highlight-current-row stripe align="center"
                          style="width: 100%;" border>
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column align="center" width="80" prop="index" label="序号"></el-table-column>

                    <el-table-column align="center" prop="name" label="呈现位名称"></el-table-column>
                    <el-table-column align="center" prop="displayUrl" label="呈现位示例图">
                        <template scope="scope">
                            <img :src="scope.row.displayUrl" class="table-img"/>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="node" label="设备来源/平台" width="140"></el-table-column>
                    <el-table-column align="center" prop="nicheGroupName" label="呈现位分类"></el-table-column>
                    <el-table-column align="center" prop="creatorName" label="创建人"></el-table-column>
                    <el-table-column align="center" prop="status" :formatter="formatterStatus" label="状态"
                                     width="100"></el-table-column>
                    <el-table-column align="center" label="操作" width="200">
                        <template scope="scope">
                            <el-button size="text" class="btn_line" @click="handleEdit(scope.row.id)">编辑</el-button>
                            <el-button type="text" class="btn_line" @click="handleCheck(scope.row.id)">查看</el-button>
                            <el-button type="text" class="btn_line" @click="handleDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="lc-pagination-container">
                    <el-pagination
                            @size-change="changeSize"
                            @current-change="changeCurPage"
                            :current-page.sync="paginationData.currentPage"
                            :page-sizes="[10, 20, 30, 50, 80, 100]"
                            :page-size="paginationData.limit"
                            layout="total, sizes, prev, pager, next"
                            :total="paginationData.total">
                    </el-pagination>
                </div>
            </custom-card>
        </div>
    </page>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

