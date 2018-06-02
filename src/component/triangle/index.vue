<template>
        <div class="tool-triangle" :style="{margin: levelMargin}">
            <i class="left-top-triangle">{{levelIndex}}</i>
            <slot></slot>
        </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>