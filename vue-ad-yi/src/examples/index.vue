<template>
  <div>
    <h1>Yi + 广告系统组件库</h1>
    <ol class="tab">
      <router-link to="/adPreview" tag="li">广告预览</router-link>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'el-index',
  }
</script>

<style lang="less" scoped>
  h1 {
    text-align: center;
  }
  .tab {
    line-height: 40px;
    padding-left: 50px;
    margin: 5px 0;
    background-color: #F2F2F2;
    li {
      color: #7e8c8d;
      cursor: pointer;
    } &:hover {
      background-color: #ccc;
    }
  }
</style>