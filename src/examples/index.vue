<template>
  <div class="index">
    <h1>Yi + 广告系统组件库</h1>
    <ul class="tab">
      <router-link v-for="(item, index) in comps" :to="item.routerTo" tag="li">{{ ++index }}. {{ item.label }}</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'el-index',
    data () {
      return {
        comps: [{
          routerTo: 'adCommonPreview',
          label: '广告预览'
        },
        {
          routerTo: 'timeRange',
          label: '时间范围控件'
        },
        {
          routerTo: 'adPreview',
          label: '广告预览GIF'
        },
        {
          routerTo: 'dragView',
          label: '可拖动视窗'
        }]
      }
    }
  }
</script>

<style scoped>
  .index {
    padding: 0 15px;
  }

  .index h1 {
    text-align: center;
  }
  .index .tab {
    line-height: 40px;
    padding-left: 0;
    margin: 5px 0;
    background-color: #F2F2F2;
  }

  .index .tab li {
    color: #7e8c8d;
    cursor: pointer;
    list-style: none;
    padding: 0 15px;   
    border-bottom: 1px solid #ddd
  }

  .index .tab li:hover {
    background-color: #ddd;
  }
</style>