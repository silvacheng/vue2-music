<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  export default {
    components: {
      MHeader: MHeader,
      Tab: Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/variable.styl';

  #app
    color: $color-theme
</style>
