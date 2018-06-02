<template>
    <div>
        <!--<div class="radio-btn" v-for="(item, index) in items" :class="{active: item.value==currentValue}" :key="index" @click="handleClick(item.value)">{{item.label}}</div>-->
        <template v-for="(item, index) in items" class="radio-btn">
            <!--<div :class="{active: item.value==currentValue}" style="display: none;"></div>-->
            <el-button :class="{'radio-group-active': (item.value==currentValue)}"
                       :key="index" :title="item.label"
                       @click="handleClick(item.value)">{{item.label}}

            </el-button>
        </template>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

