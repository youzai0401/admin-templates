<template>
      <div class="part-item bubbles-wrap">
        <div class="clearfix">
            <div class="fl part-item-left width180">
                <span>样式配置：</span>
            </div>
            <div v-for="(item, index) in templateData.styleConfig.bubbles"
                 class="part-item-right">
                {{convertBubbles(index)}}： <i class="place"></i><span>{{item}}</span>
            </div>

            <div class="part-item-right">
                头像A：<i class="place"></i>
                <img style="max-width: 200px"
                     v-for="item in avatarAImgList"
                     :src="item" alt="">
            </div>

            <div class="part-item-right">
                气泡A背景色选中按钮颜色： <i class="place"></i>
                <span>{{chooseBubbleAColor}}</span>
                <span class="btn-color"
                      :style="{'vertical-align': 'middle','border':'1px solid #bfcbd9','width': '100px', 'height': '27px', 'margin-left': '10px', 'display': 'inline-block', 'background':chooseBubbleAColor}">
                                                                    </span>
            </div>

            <div class="part-item-right">
                头像B：<i class="place"></i>
                <img style="max-width: 200px"
                     v-for="item in avatarBImgList"
                     :src="item" alt="">
            </div>

            <div class="part-item-right">
                气泡B背景色选中按钮颜色： <i class="place"></i>
                <span>{{chooseBubbleBColor}}</span>
                <span class="btn-color"
                      :style="{'vertical-align': 'middle','border':'1px solid #bfcbd9','width': '100px', 'height': '27px', 'margin-left': '10px', 'display': 'inline-block', 'background':chooseBubbleBColor}">
                                                                    </span>
            </div>

            <div class="part-item-right">
                选项一： <i class="place"></i>
                <span>{{templateData.styleConfig.option1}}</span>
            </div>

            <div class="part-item-right">
                选项二： <i class="place"></i>
                <span>{{templateData.styleConfig.option2}}</span>
            </div>

            <div class="part-item-right">
                倒计时： <i class="place"></i>
                <span>{{templateData.styleConfig.countDown}}</span>
            </div>
        </div>

          <div class="clearfix">
              <div class="fl part-item-left width180">
                  <span>基础数据：</span>
              </div>

              <div class="part-item-right">
                  选项一： <i class="place"></i>
                  <span>{{templateData.styleConfig.option1Initial}}</span>
              </div>

              <div class="part-item-right">
                  选项二： <i class="place"></i>
                  <span>{{templateData.styleConfig.option2Initial}}</span>
              </div>


          </div>



        <div class="clearfix">
            <div class="fl part-item-left width180">
                <span>是否有奖品：</span>
            </div>
            <div class="part-item-right">
                <span>{{hasPrize}}</span>
            </div>
        </div>

        <div class="clearfix">
            <div class="fl part-item-left width180">
                <span>结果一：</span>
            </div>

            <div class="part-item-right">
                结果图片：
                <i class="place"></i>
                <img style="max-width: 200px"
                     v-for="item in resultOneImgList"
                     :src="item" alt="">
            </div>

            <div class="part-item-right" v-if="bubblesHasPrize == 1">
                二维码URL：
                <i class="place"></i><span>{{templateData.result[0].resultUrl}}</span>
            </div>

        </div>

        <div class="clearfix">
            <div class="fl part-item-left width180">
                <span>结果二：</span>
            </div>

            <div class="part-item-right">
                结果图片：
                <i class="place"></i>
                <img style="max-width: 200px"
                     v-for="item in resultTwoImgList"
                     :src="item" alt="">
            </div>

            <div class="part-item-right" v-if="bubblesHasPrize == 1">
                二维码URL：<i class="place"></i><span>{{templateData.result[1].resultUrl}}</span>
            </div>

        </div>


        <div class="clearfix">
            <div class="fl part-item-left width180">
                <span>广告角标：</span>
            </div>
            <div class="part-item-right">
                <span>{{adMark}}</span>
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped lang="less" src="./style.less"></style>