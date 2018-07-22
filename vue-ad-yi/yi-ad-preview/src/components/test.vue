<template>
  <div class="test">
    <div class="logo">
      <h2>广告预览logo</h2>
      <YiAdPreview 
        :width="testObj1.width" 
        :height="testObj1.height"
        :bgUrl="testObj1.bgUrl"
        :type="testObj1.type"
        :resource="testObj1.resource"
        :theme="testObj1.theme"
        ref="ref1" />
    </div>
    <div class="bubble">
      <h2>广告预览bubble</h2>
      <YiAdPreview 
        :width="testObj2.width" 
        :height="testObj2.height"
        :bgUrl="testObj2.bgUrl"
        :type="testObj2.type"
        :resource="testObj2.resource"
        :theme="testObj2.theme" 
        ref="ref2"/>
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
        bubble: {
          width: '600',
          height: '400', 
          type: 'bubble',

          bgWidth: '500',
          bgHeight: '300', 
          bgUrl: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-06-22/12230_black.jpeg',
          bgX: '10',
          bgY: '10',
            
          theme: [
            {
              width: '300',
              height: '200',
              x: '10',
              y: '100',
            }
          ],

          resource: [
            {
              width: '200',
              height: '60',
              x: '0',
              y: '100',
              animation: 'bottom',
              duration: '1',
              delay: '0',
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: '200',
              height: '60',
              x: '0',
              y: '100',
              animation: 'bottom',
              duration: '1',
              delay: '0',
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: '200',
              height: '60',
              x: '0',
              y: '100',
              animation: 'bottom',
              duration: '1',
              delay: '0',
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            },
            {
              width: '200',
              height: '60',
              x: '0',
              y: '100',
              animation: 'bottom',
              duration: '1',
              delay: '0',
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/52082_1.png'            
            }
          ]
        },
        logo: {
          width: '600',
          height: '400', 
          type: 'logo',

          bgWidth: '500',
          bgHeight: '300', 
          bgUrl: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-06-22/12230_black.jpeg',
          bgX: '10',
          bgY: '10',
            
          theme: [
            {
              width: '300',
              height: '200',
              x: '10',
              y: '100',
            }
          ],

          resource: [
            {
              width: '200',
              height: '60',
              x: '0',
              y: '100',
              animation: 'bottom',
              duration: '1',
              delay: '0',
              url: 'http://otl6ypoog.bkt.clouddn.com/Objectstoarge/images/2018-07-20/58842_2.png'            
            }
          ]
          
        },

        testObj1: {},
        testObj2: {}
        
      }
    },
    mounted () {
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
