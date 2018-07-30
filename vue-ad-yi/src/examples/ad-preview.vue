<template>
  <div class="test">
    <span @click="refresh" class="refresh">刷新</span>
    <div class="container">
      <div class="logo">
        <h2>广告预览logo</h2>
        <AdPreview 
          :width="width" 
          :height="height"
          :bgUrl="testObj1.bgUrl"
          :type="testObj1.type"
          :resourceList="testObj1.resourceList"
          :theme="testObj1.theme"
          id="logo"
          class="ad-preview"
          :style="{width: this.width, height: this.height}"/>
      </div>
      <div class="bubble">
        <h2>广告预览bubble</h2>
        <AdPreview 
          :width="width" 
          :height="height"
          :bgUrl="testObj2.bgUrl"
          :type="testObj2.type"
          :resourceList="testObj2.resourceList"
          :theme="testObj2.theme"
          id="bubble"
          class="ad-preview"
          :style="{width: this.width, height: this.height}"/>
      </div>
    </div>
  </div>
</template>

<script>
  // import YiAdPreview from '@/components/ad-preview/yi-ad-preview'
  import {AdPreview} from '@/components/index.js'
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
        bubble: {
          type: 'bubble',
          bgUrl: 'https://dummyimage.com/1920x1080/99D9EA/fff',      
          theme: {
            width: 0.5,
            height: 0.5,
            left: 0.01,
            bottom: 0.2,
          },
          resourceList: [
            {
              width: 0.8,
              height: 0.15,
              x: 0.01,
              y: 0.1,
              animation: 'bottom',
              duration: 1,
              delay: 0,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'                     
            },
            {
              width: 0.8,
              height: 0.15,
              x: 0.01,
              y: 0.3,
              animation: 'bottom',
              duration: 1,
              delay: 1,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: 0.8,
              height: 0.15,
              x: 0.01,
              y: 0.5,
              animation: 'bottom',
              duration: 1,
              delay: 2,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: 0.8,
              height: 0.15,
              x: 0.01,
              y: 0.7,
              animation: 'bottom',
              duration: 1,
              delay: 3,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            }
          ]
        },
        logo: {
          type: 'logo',
          bgUrl: 'https://dummyimage.com/1920x1080/99D9EA/fff',
          theme: {
            width: 0.5,
            height: 0.5,
            left: 0.01,
            bottom: 0.1,
          },

          resourceList: [
            {
              width: 0.8,
              height: 0.3,
              x: 0.05,
              y: 0.4,
              animation: 'left',
              duration: 1,
              delay: 0,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/58842_2.png'            
            }
          ]
        },
        testObj1: {},
        testObj2: {}
      }
    },
    methods: {
      refresh () {
        this.reload()
      }
    },
    beforeMount () {
      this.testObj1 = this.logo
      this.testObj2 = this.bubble
    }
  }
</script>

<style>
  .test {
    width: 100%;
  }
  .test .refresh {
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
