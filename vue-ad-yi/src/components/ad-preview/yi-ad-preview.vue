<template>
  <div 
    class="yi-ad-preview" 
    :id="id"
    :style="{
      width: width + 'px', 
      height: height + 'px'
    }">
    <div 
      class="yi-ad-preview-bg">
      <img v-if="bgUrl" :src="bgUrl" alt="">
      <div class="yi-ad-preview-theme">
        <ul>
          <li v-if="resourceList" v-for="item in resourceList" class="yi-ad-preview-resource">
            <img :src="item.url">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      bgUrl: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      resourceList: {
        type: Array,
        required: true
      },
      theme: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        widthRatio: 1,//缩放比
        heightRatio: 1,//缩放比
        step: 1
      }
    },
    methods: {
      setBg () {
        //获取当前背景的宽高
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        let currentBgImg = document.querySelector(`#${this.id} .yi-ad-preview-bg > img`)           
        this.widthRatio =  this.width / currentBgImg.naturalWidth
        this.heightRatio =  this.height / currentBgImg.naturalHeight

        if (this.widthRatio <= this.heightRatio) {
          currentBg.style.width = currentBgImg.naturalWidth * this.widthRatio + 'px'
          currentBg.style.height = currentBgImg.naturalHeight * this.widthRatio + 'px'
          currentBgImg.width= currentBgImg.naturalWidth * this.widthRatio
          currentBgImg.height = currentBgImg.naturalHeight * this.widthRatio
        } else {
          currentBg.style.width = currentBgImg.naturalWidth * this.heightRatio + 'px'
          currentBg.style.height = currentBgImg.naturalHeight * this.heightRatio + 'px'
          currentBgImg.width  = currentBgImg.naturalWidth * this.heightRatio
          currentBgImg.height = currentBgImg.naturalHeight * this.heightRatio
        }
      },
      setTheme () {
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        //获取当前 bg 的宽高
        let {w: currentBgWidth, h: currentBgHeight} = this.getElementAttr(currentBg)
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        theme.style.width = currentBgWidth * Number(this.theme.width) + 'px'
        theme.style.height = currentBgHeight * Number(this.theme.height) + 'px'

        theme.style.top = currentBgHeight * Number(this.theme.top) + 'px'
        theme.style.right = currentBgWidth * Number(this.theme.right) + 'px'
        theme.style.bottom = currentBgHeight * Number(this.theme.bottom) + 'px'
        theme.style.left = currentBgWidth * Number(this.theme.left) + 'px'
      },
      setResource () {
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        let resource = document.querySelectorAll(`#${this.id} .yi-ad-preview-resource`)
        let resourceImg = document.querySelectorAll(`#${this.id} .yi-ad-preview-resource > img`)
        let {w: themeWidth, h: themeHeight} = this.getElementAttr(theme)

        this.resourceList.forEach((item, index) => {

          resource[index].style.width = themeWidth * Number(item.width) + 'px'
          resource[index].style.height = themeHeight * Number(item.height) + 'px'
          resource[index].style.top = themeHeight * Number(item.y) + 'px'
          resource[index].style.left = themeWidth * Number(item.x) + 'px'

          let resourceWidth = themeWidth * Number(item.width)
          let resourceHeight = themeHeight * Number(item.height)

          this.widthRatio =  resourceWidth / resourceImg[index].naturalWidth
          this.heightRatio =  resourceHeight / resourceImg[index].naturalHeight

          //矫正
          if (this.widthRatio <= this.heightRatio) {
            resource[index].style.width = resourceWidth + 'px'
            resource[index].style.height = resourceImg[index].naturalHeight * this.widthRatio + 'px'
          } else {
            resource[index].style.width = resourceImg[index].naturalWidth * this.heightRatio + 'px'
            resource[index].style.height = resourceHeight + 'px'
          }
          //暂时隐藏所有的资源
          resource[index].style.display = 'none'
        })
      },
      getElementAttr (el) {
        let w = Number(el.style.width.replace('px', ''))
        let h = Number(el.style.height.replace('px', ''))
        let t = Number(el.style.top.replace('px', ''))
        let r = Number(el.style.right.replace('px', ''))
        let b = Number(el.style.bottom.replace('px', ''))
        let l = Number(el.style.left.replace('px', ''))
        return {w, h, t, r, b, l} 
      },
      animate () {
        let bg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        //获取当前 bg 的宽高
        let {w: bgWidth, h: bgHeight} = this.getElementAttr(bg)
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        let {
          w: themeWidth, 
          h: themeHeight, 
          t: themeTop,
          r: themeRight,
          b: themeBottom,
          l: themeLeft
        } = this.getElementAttr(theme)
        let resource = document.querySelectorAll(`#${this.id} .yi-ad-preview-resource`)

        this.resourceList.forEach((item, index) => {
          //获取当前资源的宽高
          let {
            w: resourceWidth, 
            h: resourceHeight, 
            t: resourceTop,
            r: resourceRight,
            b: resourceBottom,
            l: resourceLeft
          } = this.getElementAttr(resource[index])

          switch (item.animation) {
            case 'top':
              clearInterval(item.timer)
              //横坐标不变，纵坐标变             
              //记录当前定位的位置为资源的结束位置
              item.originalPosition = Number(resource[index].style.top.replace('px', ''))
              item.timerDelay = setTimeout(() => {
                //开始运动显示资源
                resource[index].style.display = 'block'
                //运动开始位置 = 资源的高度
                item.startPosition = -resourceHeight
                //运动结束位置 = 之前定位的位置
                item.stopPosition = item.originalPosition
                resource[index].style.top = item.startPosition + 'px'
                
                // resource[index].style.bottom = item.stopPosition + 'px'

                item.unitTime = (item.duration * 1000 * this.step) / Math.abs(item.stopPosition - item.startPosition)  

                item.timer = setInterval(() => {
                  if (parseInt(resource[index].style.top.replace('px', '')) <= parseInt(item.stopPosition)) {
                    resource[index].style.top = Number(resource[index].style.top.replace('px', '')) + this.step + 'px'
                  } else {
                    clearInterval(item.timer)
                  }
                }, item.unitTime)
                clearTimeout(item.timerDelay)
              }, item.delay * 1000)
              break
            case 'right':
              clearInterval(item.timer)
              //横坐标不变，纵坐标变           
              item.timerDelay = setTimeout(() => {
                //开始运动显示资源
                resource[index].style.display = 'block'
                //清理原来用于定位的 left
                resource[index].style.left = null
                //运动开始位置 = 资源的宽度
                item.startPosition = -resourceWidth
                //运动结束位置 = 主题的高宽度 - 资源的宽度 - 资源的宽度
                item.stopPosition = themeWidth - resourceLeft - resourceWidth
                resource[index].style.right = item.startPosition + 'px'
                
                // resource[index].style.bottom = item.stopPosition + 'px'

                item.unitTime = (item.duration * 1000 * this.step) / Math.abs(item.stopPosition - item.startPosition)  

                item.timer = setInterval(() => {
                  if (parseInt(resource[index].style.right.replace('px', '')) <= parseInt(item.stopPosition)) {    
                    resource[index].style.right = Number(resource[index].style.right.replace('px', '')) + this.step + 'px'
                  } else {
                    clearInterval(item.timer)
                  }
                }, item.unitTime)
                clearTimeout(item.timerDelay)
              }, item.delay * 1000)
              break
            case 'bottom':
              clearInterval(item.timer)
              //横坐标不变，纵坐标变           
              item.timerDelay = setTimeout(() => {
                //开始运动显示资源
                resource[index].style.display = 'block'
                //清理原来用于定位的top
                resource[index].style.top = null
                //运动开始位置 = 资源的高度
                item.startPosition = -resourceHeight
                //运动结束位置 = 主题的高度 - 资源的高度 - 资源的 top
                item.stopPosition = themeHeight - resourceTop - resourceHeight
                resource[index].style.bottom = item.startPosition + 'px'
                
                // resource[index].style.bottom = item.stopPosition + 'px'

                item.unitTime = (item.duration * 1000 * this.step) / Math.abs(item.stopPosition - item.startPosition)  

                item.timer = setInterval(() => {
                  if (parseInt(resource[index].style.bottom.replace('px', '')) <= parseInt(item.stopPosition)) {
                    resource[index].style.bottom = Number(resource[index].style.bottom.replace('px', '')) + this.step + 'px'
                  } else {
                    clearInterval(item.timer)
                  }
                }, item.unitTime)
                clearTimeout(item.timerDelay)
              }, item.delay * 1000)
              break
            case 'left':
              clearInterval(item.timer)
              //纵坐标不变，横坐标变             
              //记录当前定位的位置为资源的结束位置
              item.originalPosition = Number(resource[index].style.left.replace('px', ''))
              item.timerDelay = setTimeout(() => {
                //开始运动显示资源
                resource[index].style.display = 'block'
                //运动开始位置 = 资源的高度
                item.startPosition = -resourceWidth
                //运动结束位置 = 之前定位的位置
                item.stopPosition = item.originalPosition
                resource[index].style.left = item.startPosition + 'px'
                
                // resource[index].style.bottom = item.stopPosition + 'px'

                item.unitTime = (item.duration * 1000 * this.step) / Math.abs(item.stopPosition - item.startPosition)  

                item.timer = setInterval(() => {
                  if (parseInt(resource[index].style.left.replace('px', '')) <= parseInt(item.stopPosition)) {
                    resource[index].style.left = Number(resource[index].style.left.replace('px', '')) + this.step + 'px'
                  } else {
                    clearInterval(item.timer)
                  }
                }, item.unitTime)
                clearTimeout(item.timerDelay)
              }, item.delay * 1000)
              break
          }
        })
      }
    },
    mounted () {
      setTimeout(() => {
        this.setBg()
        this.setTheme()
        this.setResource()
        this.animate()
      }, 10)
      
    }
  }
</script>

<style lang="less" scoped>
  .yi-ad-preview {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    .yi-ad-preview-bg {
      position: absolute;
      background-color: #aaa;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .yi-ad-preview-theme {
        position: absolute;
        width: 100%;
        height: 100%;
        // background-color: yellow;
        ul {
          margin: 0;
          padding: 0;
          .yi-ad-preview-resource {
            list-style: none;
            position: absolute;
            img {
              width: 100%;
              height: 100%
            }
          }
        } // end ul
      } // end theme
    } // end logoBg
  }
</style>