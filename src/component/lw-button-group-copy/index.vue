<template>
    <div class="lw-tag">
          <span v-if="selectAll" :class="(currentValue.length == items.length) ? 'lw-tag-active' : ''"
                @click="handleSelectAll()">全部
            <i v-show="value.length == items.length" class="el-icon-check"></i></span>
        <span v-for="(item, index) in items" :key="index"
              :class="isCheckedArray[index] ? 'lw-tag-active' : ''"
              @click="handleClick(item, index)">{{item.name}}
            <i v-show="isCheckedArray[index]" class="el-icon-check"></i></span>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

