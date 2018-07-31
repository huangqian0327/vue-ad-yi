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
          <li v-if="resourceListNow" v-for="item in resourceListNow" class="yi-ad-preview-resource">
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
        width: 0,
        height: 0,
        step: 1,
        timer: 0
      }
    },
    methods: {
      main () {
        this.setBg()
      },
      setBg () {
        let componentBox = document.querySelector(`#${this.id}`)
        if (!componentBox) return 
        //获取当前背景的宽高
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        let currentBgImg = document.querySelector(`#${this.id} .yi-ad-preview-bg > img`)

        this.loadImageAsync(this.bgUrl).then(() => {
          this.width = componentBox.offsetWidth
          this.height = componentBox.offsetHeight || parseInt(currentBgImg.naturalHeight / currentBgImg.naturalWidth * this.width)
          this.widthRatio =  this.width / currentBgImg.naturalWidth
          this.heightRatio =  this.height / currentBgImg.naturalHeight
          if (this.widthRatio <= this.heightRatio) {
            currentBg.style.width = parseInt(currentBgImg.naturalWidth * this.widthRatio) + 'px'
            currentBg.style.height = parseInt(currentBgImg.naturalHeight * this.widthRatio) + 'px'
            currentBgImg.width= parseInt(currentBgImg.naturalWidth * this.widthRatio)
            currentBgImg.height = parseInt(currentBgImg.naturalHeight * this.widthRatio)
          } else {
            currentBg.style.width = parseInt(currentBgImg.naturalWidth * this.heightRatio) + 'px'
            currentBg.style.height = parseInt(currentBgImg.naturalHeight * this.heightRatio) + 'px'
            currentBgImg.width  = parseInt(currentBgImg.naturalWidth * this.heightRatio)
            currentBgImg.height = parseInt(currentBgImg.naturalHeight * this.heightRatio)
          }
          //设置主题
          this.setTheme()
        })
      },
      setTheme () {
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        //获取当前 bg 的宽高
        let {w: currentBgWidth, h: currentBgHeight} = this.getElementAttr(currentBg)

        theme.style.width = parseInt(currentBgWidth * Number(this.themeNow.width)) + 'px'
        theme.style.height = parseInt(currentBgHeight * Number(this.themeNow.height)) + 'px'

        theme.style.top = parseInt(currentBgHeight * Number(this.themeNow.top)) + 'px'
        theme.style.right = parseInt(currentBgWidth * Number(this.themeNow.right)) + 'px'
        theme.style.bottom = parseInt(currentBgHeight * Number(this.themeNow.bottom)) + 'px'
        theme.style.left = parseInt(currentBgWidth * Number(this.themeNow.left)) + 'px'
        
        //设置资源
        this.setResource()
      },
      setResource () {
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        let resource = document.querySelectorAll(`#${this.id} .yi-ad-preview-resource`)
        let resourceImg = document.querySelectorAll(`#${this.id} .yi-ad-preview-resource > img`)

        const promises = this.resourceListNow.map(res => {
          if (res.url) {
            return this.loadImageAsync(res.url)
          }
        })
       
        Promise.all(promises).then(posts => {
          let {w: themeWidth, h: themeHeight} = this.getElementAttr(theme)
          this.resourceListNow.forEach((item, index) => {
            if (!item.url) {
              return
            }
            resource[index].style.width = parseInt(themeWidth * Number(item.width)) + 'px'
            resource[index].style.height = parseInt(themeHeight * Number(item.height)) + 'px'
            resource[index].style.top = parseInt(themeHeight * Number(item.y)) + 'px'
            resource[index].style.left = parseInt(themeWidth * Number(item.x)) + 'px'

            let resourceWidth = themeWidth * Number(item.width)
            let resourceHeight = themeHeight * Number(item.height)

            this.widthRatio =  resourceWidth / resourceImg[index].naturalWidth
            this.heightRatio =  resourceHeight / resourceImg[index].naturalHeight

            //矫正
            if (this.widthRatio <= this.heightRatio) {
              resource[index].style.width = parseInt(resourceWidth) + 'px'
              resource[index].style.height = parseInt(resourceImg[index].naturalHeight * this.widthRatio) + 'px'
            } else {
              resource[index].style.width = parseInt(resourceImg[index].naturalWidth * this.heightRatio) + 'px'
              resource[index].style.height = parseInt(resourceHeight) + 'px'
            }
            //暂时隐藏所有的资源
            resource[index].style.display = 'none'
          })
          //执行动画
          this.animate()
        }).catch(function(reason){
          console.log(reason)
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
      loadImageAsync (url) {
        return new Promise((resolve, reject) => {
          const image = new Image()

          image.onload = function() {
            resolve(image)
          }

          image.onerror = function() {
            reject(new Error('Could not load image at ' + url))
          }
          image.src = url
        })
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

        this.resourceListNow.forEach((item, index) => {
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
                resource[index].style.top = parseInt(item.startPosition) + 'px'
                
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
                resource[index].style.right = parseInt(item.startPosition) + 'px'
                
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

                resource[index].style.bottom = parseInt(item.startPosition) + 'px'
                
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
                resource[index].style.left = parseInt(item.startPosition) + 'px'
                
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
    watch: {
      resourceList () {
        return this.main()
      },
      theme () {
        return this.main()
      }
    },
    computed: {
      resourceListNow () {
        return JSON.parse(JSON.stringify(this.resourceList))
      },
      themeNow () {
        return JSON.parse(JSON.stringify(this.theme))
      }
    },
    mounted () {
      this.main()     
    },
    created () {
      let onresize = window.onresize
      window.onresize = () => {
        clearTimeout(this.timer)
        this.resourceListNow.forEach((item, index) => {
          clearTimeout(item.timerDelay)
        })
        this.timer = setTimeout(() => {
          this.main()
        }, 100)
        if (onresize) {
          onresize()
        }
      }
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
        overflow: hidden;
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