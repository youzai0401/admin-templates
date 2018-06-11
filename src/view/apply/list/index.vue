<template>
    <!--工具栏-->
    <page :title="title" @click="toPath">
        <div>
            <!--工具条-->
            <!--<el-row :span="24" class="toolbar">-->
            <!--<el-form :inline="true">-->
            <!--<el-form-item label="呈现位名称">-->
            <!--<el-input placeholder="" v-model="paramsData.name"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="创建人">-->
            <!--<el-input placeholder="" v-model="paramsData.creatorName"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="状态" prop="status">-->
            <!--<el-select v-model="paramsData.status" placeholder="">-->
            <!--<el-option label="全部" :value=0></el-option>-->
            <!--<el-option label="上架" :value=1></el-option>-->
            <!--<el-option label="下架" :value=2></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--&lt;!&ndash;<el-button @click="handleReset">重置</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" @click="handleSearch">查询</el-button>-->
            <!--</el-form>-->
            <!--</el-row>-->
            <!--// 表单-->
            <custom-card :width="100" class="custom-card-padding-table">
                <el-table :data="tableData" highlight-current-row stripe align="center"
                          style="width: 100%;" border>
                    <el-table-column align="center" width="80" prop="index" label="序号"></el-table-column>
                    <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="identityId" label="身份证号"></el-table-column>
                    <el-table-column align="center" prop="value" label="金额"></el-table-column>
                    <el-table-column align="center" prop="periodName" label="借款期限"></el-table-column>
                    <el-table-column align="center" prop="purpose" label="借款用途"></el-table-column>
                    <el-table-column align="center" label="借款状态">
                        <template scope="scope">
                            <el-select v-model="scope.row.status" placeholder="请选择">
                                <el-option label="拒绝" :value="1"
                                           @click.native="handleChangeStatus(scope.row.id,1)"></el-option>
                                <el-option label="待审批" :value="2"
                                           @click.native="handleChangeStatus(scope.row.id,2)"></el-option>
                                <el-option label="审批通过" :value="3"
                                           @click.native="handleChangeStatus(scope.row.id,3)"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" :formatter="yearMonDayFilter"
                                     label="更新时间"></el-table-column>
                    <el-table-column align="center" prop="createTime" :formatter="yearMonDayFilter"
                                     label="创建时间"></el-table-column>
                    <el-table-column align="center" label="操作" width="120">
                        <template scope="scope">
                            <!--<el-button size="text" class="btn_line" @click="handleEdit(scope.row.openid)">详情</el-button>-->
                            <el-button size="text" class="btn_line" @click="handleDel(scope.row.id)">删除</el-button>
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

