<template>
  <div class="time-range">
    <span @click="$router.go(-1)" class="btn">返回首页</span>
    <time-range></time-range>
  </div>
</template>

<script>
  import { timeRange } from '@/components/index.js'
  export default {
    components: {
      timeRange
    },
    data () {
      return {}
    }
  }
</script>

<style>
  .time-range .btn {
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