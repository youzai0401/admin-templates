<template>
    <div class="preview-content" v-if="getDataSuccess">
        <div class="progress-wrap">
            <div class="progress-hd" :style="{height: (106 + auditList.length*21)+'px'}">
                <div class="progress-common">
                    <img class="width56" src="./img/step01-active.png" alt="">
                    <div class="progress-desc">
                        <p class="color-blue01">待提交</p>
                        <p v-if="activityProcessData.rejected === 1" class="color-blue01">驳回</p>
                    </div>
                </div>
                <div class="progress-arrow" :class="{'overflow-hidden': !displayStyleBoolean[1][0]}">
                    <img v-if="displayStyleBoolean[1][0]" src="./img/progress-arrow.png" alt="">
                    <img v-else="" src="./img/unactive-line.png" alt="">
                </div>
                <div class="progress-common" v-if="true">
                    <img class="width56" v-if="displayStyleBoolean[1][0]" src="./img/step02-active.png" alt="">
                    <img class="width48" v-else="" src="./img/step02.png" alt="">
                    <div class="progress-desc">
                        <p :class="{'color-blue01': displayStyleBoolean[1][0]}">待审核</p>
                        <p v-for="(item, index) in auditList"
                           v-if="auditList.length !== 1"
                           :class="{'color-blue01': displayStyleBoolean[1][index+1]}">
                            {{item}}</p>
                    </div>
                </div>

                <div class="progress-arrow" :class="{'overflow-hidden': !displayStyleBoolean[2]}">
                    <img v-if="displayStyleBoolean[2]" src="./img/progress-arrow.png" alt="">
                    <img v-else="" src="./img/unactive-line.png" alt="">
                </div>
                <div class="progress-common">
                    <img class="width56" v-if="displayStyleBoolean[2]" src="./img/step03-active.png" alt="">
                    <img class="width48" v-else="" src="./img/step03.png" alt="">
                    <div class="progress-desc width190">
                        <p :class="{'color-blue01': displayStyleBoolean[2]}">审核通过 等待上架</p>
                    </div>
                </div>
                <div class="progress-arrow" :class="{'overflow-hidden': !displayStyleBoolean[3]}">
                    <img v-if="displayStyleBoolean[3]" src="./img/progress-arrow.png" alt="">
                    <img v-else="" src="./img/unactive-line.png" alt="">
                </div>
                <div class="progress-common">
                    <img class="width56" v-if="displayStyleBoolean[3]" src="./img/step04-active.png" alt="">
                    <img class="width48" v-else="" src="./img/step04.png" alt="">
                    <div class="progress-desc">
                        <p :class="{'color-blue01': displayStyleBoolean[3]}">上架</p>
                    </div>
                </div>
                <div class="progress-arrow" :class="{'overflow-hidden': !displayStyleBoolean[4]}">
                    <img v-if="displayStyleBoolean[4]" src="./img/progress-arrow.png" alt="">
                    <img v-else="" src="./img/unactive-line.png" alt="">
                </div>
                <div class="progress-common">
                    <img class="width56" v-if="displayStyleBoolean[4]" src="./img/step05-active.png" alt="">
                    <img class="width48" v-else="" src="./img/step05.png" alt="">
                    <div class="progress-desc width190">
                        <p :class="{'color-blue01': displayStyleBoolean[4]}">活动结束</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

