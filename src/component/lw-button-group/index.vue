<template>
    <div class="lw-tag">
        <span v-if="selectAll" :class="(value.length == items.length) ? 'lw-tag-active' : ''"
              @click="handleSelectAll()">全部
            <i v-show="value.length == items.length" class="el-icon-check"></i></span>
        <span v-for="(item, index) in items" :key="index"
              :class="item.checked ? 'lw-tag-active' : ''"
              @click="handleClick(item)">{{item.name}}
            <i v-show="item.checked" class="el-icon-check"></i></span>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

