<template>
    <!--工具栏-->
    <page :title="title" @click="toPath">
        <div>
            <!--工具条-->
            <el-row :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item label="姓名">
                        <el-input placeholder="" v-model="paramsData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input placeholder="" v-model="paramsData.phone"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="状态" prop="status">-->
                        <!--<el-select v-model="paramsData.status" placeholder="">-->
                            <!--<el-option label="全部" :value=0></el-option>-->
                            <!--<el-option label="上架" :value=1></el-option>-->
                            <!--<el-option label="下架" :value=2></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
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

                    <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="identityId" label="身份证号"></el-table-column>
                    <el-table-column align="center" prop="cardFront" label="身份证人像面">
                        <template scope="scope">
                            <img :src="scope.row.cardFront" class="table-img"/>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="cardBack" label="身份证背面">
                        <template scope="scope">
                            <img :src="scope.row.cardBack" class="table-img"/>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="cardPerson" label="人和身份证合照">
                        <template scope="scope">
                            <img :src="scope.row.cardPerson" class="table-img"/>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="updateTime" :formatter="yearMonDayFilter"
                                     label="更新时间"></el-table-column>
                    <el-table-column align="center" prop="createTime" :formatter="yearMonDayFilter"
                                     label="创建时间"></el-table-column>
                    <el-table-column align="center" label="操作" width="100">
                        <template scope="scope">
                            <el-button size="text" class="btn_line" @click="handleEdit(scope.row.openid)">详情</el-button>
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

