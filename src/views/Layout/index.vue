<template>
    <div id="layout">
        <LayoutMain/>
        <LayoutNav/>
        <LayoutHeader/>
    </div>
</template>
<script>
import LayoutHeader from './Components/Header';
import LayoutMain from './Components/Main';
import LayoutNav from './Components/Nav';

export default {
    name:'layout',
    components:{LayoutHeader,LayoutMain,LayoutNav},
    setup(){

    }
}
</script>
<style lang="scss" scoped>
#layout{
    background-color: red;
}
</style>