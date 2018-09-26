<template>
  <div class="test">
    <span @click="$router.go(-1)" class="btn">返回首页</span>
    <span @click="refresh" class="btn">刷新</span>
    <div class="container">
      <div class="logo">
        <h2>广告预览gif1</h2>
        <!-- <AdPreview 
          :width="width" 
          :height="height"
          :bgUrl="testObj.bgUrl"
          :type="testObj.type"
          :resourceContent="testObj.resourceContent"
          :theme="testObj.theme"
          :isList="false"
          resourceImageUrl="jobs"
          id="logo1"
          class="ad-preview"
          :style="{width: this.width, height: this.height}"/> -->
      </div>
      <div class="bubble">
        <h2>广告预览gif2</h2>
        <AdPreview 
          :width="width" 
          :height="height"
          :bgUrl="testObj1.bgUrl"
          :type="testObj1.type"
          :resourceContent="testObj1.resourceContent"
          :theme="testObj1.theme"
          :isList="false"
          resourceImageUrl="jobs"
          id="logo2"
          class="ad-preview"
          :style="{width: this.width, height: this.height}"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { AdPreview } from '@/components/index.js'
  export default {
    name: 'App',
    components: {
      AdPreview
    },
    inject: ['reload'],
    data () {
      return {
        width: '100%',
        height: '100%',
        logo: {
          type: 'logo',
          bgUrl: 'https://dummyimage.com/1920x1080/99D9EA/fff',
          theme: {
            width: 0.5,
            height: 0.5,
            left: 0.01,
            bottom: 0.1,
            show_ad_flag: true,
            show_close_flag: true,
          },
          resourceContent:{
            100: {
              entrance_animation:{
                url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-14/37689_animation.gif',
                // url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-17/91453_webp_animation.webp',
                format: 'gif',
                // format: 'webp',
                duration: 2
              },
              display_animation:{
                // url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-17/56086_animation.gif',
                url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-14/96032_webp_animation.webp',
                // format: 'gif',
                format: 'webp',
                duration: 1
              }
            }
          }
        },
        logo1: {
          type: 'logo',
          bgUrl: 'https://dummyimage.com/1920x1080/99D9EA/fff',
          theme: {
            width: 0.5,
            height: 0.5,
            left: 0.01,
            bottom: 0.1,
            show_ad_flag: true,
            show_close_flag: false,
          },
          resourceContent:{
            100: {
              entrance_animation:{
                url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-21/87675_animation.gif',
                // url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-17/91453_webp_animation.webp',
                format: 'gif',
                // format: 'webp',
                duration: 2
              },
              display_animation:{
                // url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-17/56086_animation.gif',
                // url:'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-09-14/96032_webp_animation.webp',
                // // format: 'gif',
                // format: 'webp',
                // duration: 1
              }
            }
          }
        },
        testObj: {},
        testObj1: {}
      }
    },
    methods: {
      refresh () {
        this.reload()
      }
    },
    beforeMount () {
      this.testObj = this.logo
      this.testObj1 = this.logo1
    }
  }
</script>

<style>
  .test {
    width: 100%;
  }
  .test .btn {
    display: block;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    float: right;
    color: #f00;
    cursor: pointer;
  }

  .test .container {
    width: 100%;
    overflow: hidden;
  }

  .test .logo, .test .bubble {
    width: 49%;
    float: left;
    height: 800px;
    text-align: center;
    background-color: #ccc;
    position: relative;
    /*left: 50%;
    transform: translateX(-50%);*/
  }

  .test  .ad-preview {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .test .bubble {
    margin-left: 2%
  }
</style>
