<template>
    <div>
        <div v-if="showFormatValueOnly">
            <el-tooltip v-if="formatValueZhCn.join('；').length > formatValueMaxLength" placement="top" effect="light">
                <!-- 两种展现形式 -->
                <!--<div slot="content" style="width: 360px;">{{formatValueZhCn.join('；')}}</div>-->
                <div slot="content" style="max-width: 600px;">
                    <p v-for="item in formatValueZhCn" style="margin: 5px 0">{{item}}</p>
                </div>

                <div>{{formatValueZhCn.join('；').slice(0, formatValueMaxLength - 3)}}...</div>
            </el-tooltip>
            <div v-else>{{formatValueZhCn.join('；')}}</div>
        </div>


        <div v-else style="clear: both;overflow: hidden;">
            <div class='duration'>
                <ul class='header'>
                    <li class='pull-left info'> 日期\时间 </li>
                    <li class='pull-left time'>
                        <div class='num'>00:00 - 12:00</div>
                        <ul class='detail clearfix'>
                            <li class='digital pull-left'>0</li>
                            <li class='digital pull-left'>1</li>
                            <li class='digital pull-left'>2</li>
                            <li class='digital pull-left'>3</li>
                            <li class='digital pull-left'>4</li>
                            <li class='digital pull-left'>5</li>
                            <li class='digital pull-left'>6</li>
                            <li class='digital pull-left'>7</li>
                            <li class='digital pull-left'>8</li>
                            <li class='digital pull-left'>9</li>
                            <li class='digital pull-left'>10</li>
                            <li class='digital pull-left last'>11</li>
                        </ul>
                    </li>
                    <li class='pull-left time'>
                        <div class='num'>12:00 - 24:00</div>
                        <ul class='detail clearfix'>
                            <li class='digital pull-left'>12</li>
                            <li class='digital pull-left'>13</li>
                            <li class='digital pull-left'>14</li>
                            <li class='digital pull-left'>15</li>
                            <li class='digital pull-left'>16</li>
                            <li class='digital pull-left'>17</li>
                            <li class='digital pull-left'>18</li>
                            <li class='digital pull-left'>19</li>
                            <li class='digital pull-left'>20</li>
                            <li class='digital pull-left'>21</li>
                            <li class='digital pull-left'>22</li>
                            <li class='digital pull-left last'>23</li>
                        </ul>
                    </li>
                </ul>
                <div class='duration-content'>
                    <div v-if="isMouseDown === false && curTip" class='timetip' :style="[tipPos]">
                        <p>{{curTip}}</p>
                    </div>

                    <ul class='pull-left week'>
                        <li v-for="item in weekDayNames" class='day'>{{item}}</li>
                    </ul>
                    <ul class='boxzone' @mousedown="mouseDown" @mouseover='mouseOver' @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
                        <li  v-for="item in routineKeys" :class="[routineList[item] == SELECT_STATUS.SELECTED ? 'active' : '', 'box']" :data-id="item"></li>
                    </ul>
                    <!--<div> {{routineList}}</div>-->
                </div>

            </div>
            <div class='duration-tipline'>
                <span class='color-box'></span><span>未选</span><span class='color-box color-blue'></span><span>已选</span><span class='weektip'>可拖动鼠标选择时间段</span>
                <a style="cursor: pointer" class='emptied' @click="clearSelect">清空</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>