<template>
    <div>
        <radio-group :items="items" v-model="value"></radio-group>
        <span>
            自定义单选框
        </span>
    </div>
</template>
<style scoped lang="less"></style>
<script>
    import radioGroup from './index.vue';
    export default {
        components: {
            radioGroup,
        },
        data() {
            return {
                value: '',
                items: [
                    {label: '日啊', value: '2 '},
                    {label: '风景', value: '3'},
                    {label: '蛋疼', value: '4'}
                ],
            }
        }
    }
</script>