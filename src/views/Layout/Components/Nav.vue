<template>
    <div id="nav-wrap">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff">
  <el-submenu v-for="(item,index) in routers" :key="item.id"  :index="index">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
    </div>
</template>
<script>
import { reactive,ref } from '@vue/composition-api';
export default {
    name:'navMenu',
    setup(props,context){
        console.log(context.root.$router.options);
        const isCollapse =ref(false);
       const routers=reactive(context.root.$router.options.routers);

       const handleOpen=(key, keyPath)=> {
        console.log(key, keyPath);
      }
    const handleClose=(key, keyPath)=> {
        console.log(key, keyPath);
      }

        return{
        isCollapse,
        routers,
        handleOpen,
        handleClose
        }    
    }

   
}
</script>
<style lang="scss" scoped>
#nav-wrap{
    position: fixed;
    top:0;
    left:0;
    width:$navMenu;
    height:100vh;
    background-color :#344a5f;
}
</style>