<template>
    <page :header="header">
        <div>
            属性：header: array   在menu中存在的菜单页面不需要此属性
            二级菜单页面需要手动赋值
        </div>
    </page>
</template>
<style scoped lang="less"></style>
<script>
    import Page from './index.vue'
    export default {
        components: {
            Page,
        },
        data() {
            return {
                header: [
                    {
                        title: '一级菜单名字',
                        path: '一级菜单路径' // 可不填此字段
                    }, {
                        title: '一级菜单名字',
                        path: '二级菜单路径'// 可不填此字段
                    }
                ]
            }
        }
    }
</script>