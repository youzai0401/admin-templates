<template>
    <div>
        <progress-panel @getProgressData="setProgressData" :activityId="id"></progress-panel>
    </div>
</template>
<style scoped lang="less"></style>
<script>
    import progressPanel from './index.vue';
    export default {
        components: {
            progressPanel
        },
        data() {
            return {
                value: '',
                id: 67,
                items: [
                    {label: '日啊', value: '2 '},
                    {label: '风景', value: '3'},
                    {label: '蛋疼', value: '4'}
                ]
            };
        },
        methods: {
            setProgressData(value) {
                console.log(value);
            }
        }
    };
</script>