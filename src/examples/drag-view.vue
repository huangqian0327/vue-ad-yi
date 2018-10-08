<template>
  <div class="drag-view">
    <span @click="$router.go(-1)" class="btn">返回首页</span>
    <h1>超级无敌的窗口拖拽</h1>
    <drag-view>
      <template></template>
    </drag-view>
  </div>
</template>

<script>
  import { DragView } from '@/components/index.js'
  export default {
    components: {
      DragView
    },
    data () {
      return {}
    }
  }
</script>
<style>
  body {
    overflow-x: hidden
  }
  .drag-view h1 {
    margin: 0;
    width: 100%;
    text-align: center;
    background-color: #ccc;
  }
  .drag-view .btn {
    display: block;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    float: right;
    color: #f00;
    cursor: pointer;
  }
</style>
