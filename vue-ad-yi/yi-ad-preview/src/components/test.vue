<template>
  <div class="test">
    <div class="logo">
      <h2>广告预览logo</h2>
      <YiAdPreview 
        :width="width" 
        :height="height"
        :bgUrl="testObj1.bgUrl"
        :type="testObj1.type"
        :resourceList="testObj1.resourceList"
        :theme="testObj1.theme"
        id="logo"/>
    </div>
    <div class="bubble">
      <h2>广告预览bubble</h2>
      <YiAdPreview 
        :width="width" 
        :height="height"
        :bgUrl="testObj2.bgUrl"
        :type="testObj2.type"
        :resourceList="testObj2.resourceList"
        :theme="testObj2.theme"
        id="bubble"/>
    </div>
  </div>
</template>

<script>
  import YiAdPreview from '@/components/yi-ad-preview'
  export default {
    name: 'App',
    components: {
      YiAdPreview
    },
    data () {
      return {
        width: 600,
        height: 500,
        bubble: {
          type: 'bubble',
          bgUrl: 'https://dummyimage.com/1920x1080/99D9EA/fff',      
          theme: {
            width: 0.5,
            height: 0.5,
            left: 0.1,
            bottom: 0.5,
          },
          resourceList: [
            {
              width: 0.8,
              height: 0.1,
              x: 0.1,
              y: 0.1,
              animation: 'bottom',
              duration: 1,
              delay: 0,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'                     
            },
            {
              width: 0.8,
              height: 0.1,
              x: 0.1,
              y: 0.3,
              animation: 'bottom',
              duration: 1,
              delay: 1,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: 0.8,
              height: 0.1,
              x: 0.1,
              y: 0.5,
              animation: 'bottom',
              duration: 1,
              delay: 2,
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: 0.8,
              height: 0.1,
              x: 0.1,
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
            left: 0.1,
            bottom: 0.5,
          },

          resourceList: [
            {
              width: 0.8,
              height: 0.3,
              x: 0.05,
              y: 0.05,
              animation: 'right',
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
    created () {
      //品牌展示测试
      this.testObj1 = this.logo
      this.testObj2 = this.bubble
      //气泡测试
      // this.TestObj1 = this.bubble
    }
  }
</script>

<style lang="less">
  .test {
    width: 100%;
  }

  .logo, .bubble {
    width: 49%;
    float: left;
    height: 600px;
    text-align: center;
    background-color: #ccc
  }

  .bubble {
    margin-left: 2%
  }
</style>
