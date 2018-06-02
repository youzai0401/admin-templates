<template>
        <div class="sidebar" :class="{collapsed:collapsed}">
            <!--导航菜单 折叠前-->

            <div v-show="!collapsed"  class="sidebar-normal-child">
                <div class="lc-menu-container" ref="menu">
                    <!--<img class="menu-img-logo" :src="images.logo">-->
                    <!--<div class="lc-menu-scroll">-->
                    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                        <template v-for="(item, index) in items" v-if="item.subs.length !== 0">
                            <template v-if="item.subs">
                                <el-submenu :index="item.index">
                                    <template slot="title" style="padding-left: 16px"><i
                                            :class="[item.icon,'iconfont']"></i><span :class="{'submenu-active': getIndexArray(item.subs).indexOf(onRoutes)> -1}">{{ item.title }}</span></template>
                                    <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                                        <span class="point"></span>
                                        {{subItem.title }}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="item.index">
                                    <i :class="[item.icon,'iconfont']"></i>{{ item.title }}


                                </el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                    <!--</div>-->
                </div>
            </div>


            <!--导航菜单-折叠后-->
            <div v-show="collapsed" ref="menuCollapsed" class="lc-menu-collapsed-container">
                <!--<img :src="images.logo2" alt="" style="width: 100%;">-->
                <!--<div class="lc-menu-scroll">-->
                <ul class="el-menu el-menu-vertical-demo collapsed-menu">
                    <template v-for="(item,index) in items" v-if="!item.hidden && item.subs.length !== 0">
                        <li v-if="item.subs" class="el-submenu item sub-menu-item" @mouseover="showMenu(index,true)"
                            @mouseout="showMenu(index,false)">
                            <div class="el-submenu-title" :class="'submenu-title-'+index" style="padding-left: 20px;"><i
                                    class="iconfont" :class="[{'submenu-active': getIndexArray(item.subs).indexOf(onRoutes)> -1}, item.icon]"></i></div>
                            <ul class="el-menu submenu lc-menu" :class="'submenu-hook-'+index">
                                <li v-for="(child, key) in item.subs" v-if="!child.hidden" :key="child.index"
                                    class="lc-menu-item"
                                    style="padding-left: 10px;"
                                    :class="[child.index==onRoutes?'is-active':'', 'submenu-title-'+index + key, child.index==onRoutes?'is-path':'']"
                                    @click="toPath(child.index)"
                                    @mouseover="showStatus(index,key,true)" @mouseout="showStatus(index,key,false)">
                                    <span class="point"></span>
                                    {{child.title}}
                                </li>
                            </ul>
                        </li>
                        <li class="el-submenu only-menu-item" v-else>
                            <div class="el-submenu-title lc-menu-item"
                                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                                 :class="item.index==onRoutes?'is-active':''" @click="toPath(item.index)">
                                <i class="iconfont" :class="item.icon"></i>
                            </div>
                        </li>
                    </template>
                </ul>
                <!--</div>-->
            </div>
        </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

