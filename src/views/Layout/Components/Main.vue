<template>
    <div id="main-wrap">
        <router-view />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#main-wrap{
    position: fixed;
    left:$navMenu;
    top:75px;
    right: 0;
    border: 30px solid #f7f7f7;
    padding: 30px;
    -webkit-box-sizing:border;
}
</style>