<template>
    <div class="wrap">
        <el-row class="block" type="flex" align="middle" v-for="(item,index) in list" :key="`debtInfo${index}`">
            <el-col :span="23">
                <slot name="item" :item="item" :index="index"></slot>
            </el-col>
            <el-col :span="1" style="text-align: right">
                <i class="el-icon-close" style="cursor: pointer" @click="handleDeleteCover(index)"></i>
            </el-col>
        </el-row>
        <el-button plain style="width: 100%" @click="handleAddCover">
            添加
        </el-button>
    </div>
</template>
<script>

    export default {
        name: 'block',
        props: {
            list: {
                type: Array, default() {
                    return [];
                }
            },
            title: {type: String, default: '模块'},
            max: {type: Number, default: 10}
        },
        components: {},
        methods: {
            handleDeleteCover(index) {
                this.list.splice(index, 1);
            },
            handleAddCover() {
                console.log(this.list.length);
                if (this.list.length <= this.max - 1) {
                    this.list.push({});
                } else {
                    this.$message({
                        message: `最多添加${this.max}条`,
                        type: 'warning'
                    });
                }
            }
        }

    };
</script>
<style scoped lang="less">
    .block {
        margin-bottom: 10px;
        padding: 10px 10px 0 10px;
        border-radius: 4px;
        border: 1px solid #989898;
    }
</style>


