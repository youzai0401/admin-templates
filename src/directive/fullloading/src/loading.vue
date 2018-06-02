<template>
    <transition name="el-loading-fade" @after-leave="handleAfterLeave">
        <div
                v-show="visible"
                class="el-loading-mask"
                :class="[customClass, { 'is-fullscreen': fullscreen }]">
            <div class="el-loading-spinner">
                <!--<svg class="circular" viewBox="25 25 50 50">-->
                    <!--<circle class="path" cx="50" cy="50" r="20" fill="none"/>-->
                <!--</svg>-->
                <!--<p v-if="text" class="el-loading-text">{{ text }}</p>-->
                <p class="el-loading-text">Loading...</p>
            </div>
            <!--add-->
            <div id="loading-center-absolute">
                <div class="object" id="object_one"></div>
                <div class="object" id="object_two"></div>
                <div class="object" id="object_three"></div>
                <div class="object" id="object_four"></div>
                <div class="object" id="object_five"></div>
                <div class="object" id="object_six"></div>
                <div class="object" id="object_seven"></div>
                <div class="object" id="object_eight"></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                text: null,
                fullscreen: true,
                visible: false,
                customClass: ''
            };
        },

        methods: {
            handleAfterLeave() {
                this.$emit('after-leave');
            },
            setText(text) {
                this.text = text;
            }
        }
    };
</script>

<style scoped>
    .el-loading-mask {
        position: absolute;
        z-index: 10000;
        background-color: rgba(255,255,255,.9);
        margin: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: opacity .3s;
    }
    .el-loading-spinner .el-loading-text {
        color: #39daff;
        margin: 3px 0;
        font-size: 14px;
    }
    #loading-center-absolute {
        position: fixed;
        left: 50%;
        top: 50%;
        height: 150px;
        width: 150px;
        margin-top: -75px;
        margin-left: 25px;
        transform: scale(0.53);
        -moz-border-radius: 50% 50% 50% 50%;
        -webkit-border-radius: 50% 50% 50% 50%;
        border-radius: 50% 50% 50% 50%;
    }
    .el-loading-spinner {
        /*top: auto;*/
        /*margin-top: 0 !important;*/
        /*bottom: 20px !important;*/

        position: fixed;
        left: 50%;
        top: 50%;
        height: 150px;
        width: 150px;
        margin-top: 65px;
        margin-left: 25px;
    }
    /* 以上为element-ui的覆写样式*/
    .object {
        width: 16px;
        height: 16px;
        background-color: #39daff;
        position: absolute;
        -moz-border-radius: 50% 50% 50% 50%;
        -webkit-border-radius: 50% 50% 50% 50%;
        border-radius: 50% 50% 50% 50%;
        -webkit-animation: animate 0.8s infinite;
        animation: animate 0.8s infinite;
    }
    #object_one {
        top: 19px;
        left: 19px;
    }
    #object_two {
        top: 0px;
        left: 65px;
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;

    }
    #object_three {
        top: 19px;
        left: 111px;
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;

    }
    #object_four {
        top: 65px;
        left: 130px;
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }
    #object_five {
        top: 111px;
        left: 111px;
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }
    #object_six {
        top: 130px;
        left: 65px;
        -webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
    }
    #object_seven {
        top: 111px;
        left: 19px;
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
    }
    #object_eight {
        top: 65px;
        left: 0px;
        -webkit-animation-delay: 0.7s;
        animation-delay: 0.7s;
    }
    @-webkit-keyframes animate {

        25% {
            -ms-transform: scale(1.5);
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
        }
        75% {
            -ms-transform: scale(0);
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }

    @keyframes animate {
        50% {
            -ms-transform: scale(1.5,1.5);
            -webkit-transform: scale(1.5,1.5);
            transform: scale(1.5,1.5);
        }

        100% {
            -ms-transform: scale(1,1);
            -webkit-transform: scale(1,1);
            transform: scale(1,1);
        }

    }
</style>