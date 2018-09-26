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
      <img class="bgImg" v-if="bgUrl" :src="bgUrl" alt="">
      <div class="yi-ad-preview-theme">
        <div v-if="!isList" class='ad-desription'>
          <div class="adFont" v-if="themeNow.show_ad_flag"></div>
          <div class="closeBtn" @click="closeAd" v-if="themeNow.show_close_flag"></div>
        </div>
        <img v-if="isList" :src="resourceImageUrl" id="staticImg" width="100%" height="100%">
        <div v-if="!isList" style="width: 100%; height: 100%">
          <div id="mask"></div>
          <div class="entranceBox">
            <img id="entrance-gif" rel_auto_play="0"/>
          </div>
          <div class="displayBox">
            <img id="display-gif" rel_auto_play="0"/>
          </div> 
        </div>
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
      resourceContent: {
        type: Object,
        required: true
      },
      theme: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      isList: {
        type: Boolean,
        required: true
      },
      resourceImageUrl: {
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
        entranceImg: '',
        displayImg: ''
      }
    },
    methods: {
      main () {
        this.$nextTick(() => {
          this.setBg()
        })
      },
      setBg () {
        let componentBox = document.querySelector(`#${this.id}`)
        if (!componentBox) return 
        //获取当前背景的宽高
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        let currentBgImg = document.querySelector(`#${this.id} .yi-ad-preview-bg > img`)

        this.width = componentBox.offsetWidth
        
        this.loadImageAsync(this.bgUrl).then(() => {
          if (this.originalComponetHeight == null) {
            this.height = componentBox.offsetHeight || Math.round(currentBgImg.naturalHeight / currentBgImg.naturalWidth * this.width)
            this.originalComponetHeight = componentBox.offsetHeight
          } else {
            this.height = this.originalComponetHeight || Math.round(currentBgImg.naturalHeight / currentBgImg.naturalWidth * this.width)
          }

          this.widthRatio =  this.width / currentBgImg.naturalWidth
          this.heightRatio =  this.height / currentBgImg.naturalHeight
          if (this.widthRatio <= this.heightRatio) {
            currentBg.style.width = Math.round(currentBgImg.naturalWidth * this.widthRatio) + 'px'
            currentBg.style.height = Math.round(currentBgImg.naturalHeight * this.widthRatio) + 'px'
            currentBgImg.width= Math.round(currentBgImg.naturalWidth * this.widthRatio)
            currentBgImg.height = Math.round(currentBgImg.naturalHeight * this.widthRatio)
          } else {
            currentBg.style.width = Math.round(currentBgImg.naturalWidth * this.heightRatio) + 'px'
            currentBg.style.height = Math.round(currentBgImg.naturalHeight * this.heightRatio) + 'px'
            currentBgImg.width  = Math.round(currentBgImg.naturalWidth * this.heightRatio)
            currentBgImg.height = Math.round(currentBgImg.naturalHeight * this.heightRatio)
          }
          currentBgImg.style.visibility = 'visible'
          //设置主题
          this.setTheme()
        })
      },
      setTheme () {
        let currentBg = document.querySelector(`#${this.id} .yi-ad-preview-bg`)
        let theme = document.querySelector(`#${this.id} .yi-ad-preview-theme`)
        //获取当前 bg 的宽高
        let {w: currentBgWidth, h: currentBgHeight} = this.getElementAttr(currentBg)
        if (theme) {
          theme.style.width = Math.round(currentBgWidth * Number(this.themeNow.width)) + 'px'
          // theme.style.height = Math.round(currentBgHeight * Number(this.themeNow.height)) + 'px'
          theme.style.height = Math.round(currentBgHeight * Number(this.themeNow.height)) + 'px'

          //初始化主题的定位
          theme.style.top = ""
          theme.style.right = ""
          theme.style.bottom = ""
          theme.style.left = ""
          
          theme.style.top = Math.round(currentBgHeight * Number(this.themeNow.top)) + 'px'
          theme.style.right = Math.round(currentBgWidth * Number(this.themeNow.right)) + 'px'
          theme.style.bottom = Math.round(currentBgHeight * Number(this.themeNow.bottom)) + 'px'
          theme.style.left = Math.round(currentBgWidth * Number(this.themeNow.left)) + 'px'
        }
      },
      getElementAttr (el) {
        let w = Number(el ? el.style.width.replace('px', '') : 0)
        let h = Number(el ? el.style.height.replace('px', '') : 0)
        let t = Number(el ? el.style.top.replace('px', '') : 0)
        let r = Number(el ? el.style.right.replace('px', '') : 0)
        let b = Number(el ? el.style.bottom.replace('px', '') : 0)
        let l = Number(el ? el.style.left.replace('px', '') : 0)
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
      isGif (format) {
        return format.toLowerCase() == 'gif'
      },
      display () {     
        try {
          if (this.entranceImg.url == undefined) {
            if (this.displayImg.url == undefined) { // null -> null
              console.log('null -> null')
              console.log('参数错误')
            } else if (this.isGif(this.displayImg.format)) { //null -> gif
              console.log('null -> gif')
              let sup2 = new SuperGif({ 
                gif: document.querySelector(`#${this.id} #display-gif`), 
              })
              sup2.load(() => {
                //隐藏静态图
                document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
                //显示第二张
                document.querySelector(`#${this.id} .displayBox`) ? document.querySelector(`#${this.id} .displayBox`).style.display = 'block' : ''
                sup2.play()
                this.setGifResPosition()
              })
            } else { // null -> noGif 
              console.log('null -> noGif')
              //隐藏静态图
              document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
              //显示第二张
              document.querySelector(`#${this.id} .displayBox`) ? document.querySelector(`#${this.id} .displayBox`).style.display = 'block' : ''
              document.querySelector(`#${this.id} .displayBox > img`) ? document.querySelector(`#${this.id} .displayBox > img`).src = this.displayImg.url : ''
              this.setNoGifResPosition()
            }
          } else if (this.isGif(this.entranceImg.format)) {
            if (this.displayImg.url == undefined) { // gif -> null
              console.log('gif -> null')
              let sup1 = new SuperGif({ 
                gif: document.querySelector(`#${this.id} #entrance-gif`), 
                on_end: () => {
                  sup1.pause()
                  this.setNoGifResPosition()
                }
              })
              sup1.load(() => {
                console.log('gif1 is loaded')
                //隐藏静态图
                document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
                //显示第一张
                document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'block' : ''
                sup1.play()
                this.setGifResPosition()
              })
            } else { // gif -> noGif
              console.log('gif -> noGif')
              let sup1 = new SuperGif({ 
                gif: document.querySelector(`#${this.id} #entrance-gif`), 
                on_end: () => {
                  sup1.pause()
                  // 隐藏第一张
                  document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'none' : ''
                  // 显示第二张
                  document.querySelector(`#${this.id} .displayBox`) ? document.querySelector(`#${this.id} .displayBox`).style.display = 'block' : ''
                  document.querySelector(`#${this.id} .displayBox > img`) ? document.querySelector(`#${this.id} .displayBox > img`).src = this.displayImg.url : ''
                  this.setNoGifResPosition()
                }
              })
              sup1.load(() => {
                // //隐藏静态图
                document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
                //显示第一张
                document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'block' : ''
                sup1.play()
                this.setGifResPosition()
              })
            } 
          } else if (!this.isGif(this.entranceImg.format)) {
            if (this.displayImg.url == undefined) { //noGif -> null
              console.log('noGif -> null')
              //隐藏静态图
              document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
              //显示第一张
              document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'block' : ''
              document.querySelector(`#${this.id} .entranceBox > img`).src = this.entranceImg.url
              this.setNoGifResPosition()
            } else if (this.isGif(this.displayImg.format)) {  //noGif -> Gif
              console.log('noGif -> Gif')
              let sup2 = new SuperGif({ 
                gif: document.querySelector(`#${this.id} #display-gif`),
              })
              sup2.load(() => {
                //隐藏静态图
                document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
                //显示第一张
                document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'block' : ''
                document.querySelector(`#${this.id} .entranceBox > img`).src = this.entranceImg.url
                this.setNoGifResPosition()
                setTimeout(() => {
                  // 隐藏第一张
                  document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'none' : ''
                  // 显示第二张
                  document.querySelector(`#${this.id} .displayBox`) ? document.querySelector(`#${this.id} .displayBox`).style.display = 'block' : ''
                  sup2.play()
                  this.setGifResPosition()
                }, this.entranceImg.duration * 1000)
              })
            } else { //noGif -> noGif
              //隐藏静态图
              document.querySelector(`#${this.id} #mask`) ? document.querySelector(`#${this.id} #mask`).style.display = 'none' : ''
              //显示第一张
              document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'block' : ''
              document.querySelector(`#${this.id} .entranceBox > img`).src = this.entranceImg.url
              this.setNoGifResPosition()
              setTimeout(() => {
                // 隐藏第一张
                document.querySelector(`#${this.id} .entranceBox`) ? document.querySelector(`#${this.id} .entranceBox`).style.display = 'none' : ''
                // 显示第二张
                document.querySelector(`#${this.id} .displayBox`) ? document.querySelector(`#${this.id} .displayBox`).style.display = 'block' : ''
                document.querySelector(`#${this.id} .displayBox > img`) ? document.querySelector(`#${this.id} .displayBox > img`).src = this.displayImg.url : ''
              }, this.entranceImg.duration * 1000)
            }
          }
        } catch (err) {
          console.log(err)
        }
        
      },
      previewImg () {
        let oImg = document.querySelector(`#${this.id} .previewImg`)
        oImg.style.backgroundImage = `url(${this.resourceContentNow[100].entrance_animation.url}")`
      },
      // getRandom () {
      //   return Math.round(Math.random() * 1000000000000)
      // },
      setResource () {
        let entranceGif = document.querySelector(`#${this.id} #entrance-gif`)
        let displayGif = document.querySelector(`#${this.id} #display-gif`)

        this.entranceImg = this.resourceContentNow[100].entrance_animation
        this.displayImg = this.resourceContentNow[100].display_animation

        entranceGif.setAttribute('rel_animated_src', this.entranceImg.url)
        displayGif.setAttribute('rel_animated_src', this.displayImg.url)

        this.display()      
      },
      setNoGifResPosition () {
        let oImgBox = document.querySelector(`#${this.id} .entranceBox`),
            oImgBoxWidth = oImgBox.offsetWidth, 
            oImgBoxHeight = oImgBox.offsetHeight,
            oImg1 = document.querySelector(`#${this.id} .displayBox > img`),
            oImg2 = document.querySelector(`#${this.id} .entranceBox > img`),
            oImgWidth,
            oImgHeight

        oImgWidth = oImg1 ? oImg1.offsetWidth : (oImg2 ? oImg2.offsetWidth : '')
        oImgHeight = oImg1 ? oImg1.offsetHeight : (oImg2 ? oImg2.offsetHeight : '')

        if (oImgBoxWidth / oImgBoxHeight >= oImgWidth / oImgHeight) {
          oImg1 ? oImg1.style.width = '100%' : null
          oImg2 ? oImg2.style.width = '100%' : null
        } else {
          oImg1 ? oImg1.style.height = '100%' : null
          oImg2 ? oImg2.style.height = '100%' : null
        }
      },      
      setGifResPosition () {
        let jsgif = document.querySelectorAll(`#${this.id} .jsgif`),
            themeWidth,
            themeHeight

        if (jsgif[0]) {
          themeWidth = jsgif[0].offsetWidth,
          themeHeight = jsgif[0].offsetHeight
        }

        jsgif.forEach(item => {
          item.style.width = '100%'
          item.style.height = '100%'
          let gifWidth = item.offsetWidth
          let gifHeight = item.offsetHeight
          if (themeWidth / themeHeight >= gifWidth / gifHeight) {
            item.querySelector(`#${this.id} canvas`).style.width = '100%'
          } else {
            item.querySelector(`#${this.id} canvas`).style.height = '100%'
          }
          item.style.textAlign = 'left'
        })
      },
      closeAd () {
        document.querySelector(`#${this.id} .yi-ad-preview-theme`).style.display = 'none'
      }
    },
    watch: {
      theme () {
        return this.main()
      }
    },
    computed: {
      resourceContentNow () {
        return JSON.parse(JSON.stringify(this.resourceContent))
      },
      themeNow () {
        let theme = JSON.parse(JSON.stringify(this.theme))
        theme.show_ad_flag = theme.show_ad_flag ? theme.show_ad_flag : true
        theme.show_close_flag = theme.show_close_flag ? theme.show_close_flag : false
        return theme
      }
    },
    mounted () {
      this.main()    
      if (!this.isList) {
        this.setResource()
      }
    },
    created () {
      let onresize = window.onresize
      window.onresize = () => {
        clearTimeout(this.timer)
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
      .bgImg {
        position: absolute;
        left: 50%;
        top: 50%;
        visibility: hidden;
        transform: translate(-50%, -50%);
      }
      .yi-ad-preview-theme {
        position: absolute;
        width: 100%;
        height: 100%;
        .ad-desription {
          font-size: 13px;
          color: #fff;
          box-sizing: border-box;
          position: absolute;
           top: -11%;
           width: 100%;
           height: 10%;
          > div {
            width: 10%;
            height: 100%;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            z-index: 99999;
            position: absolute;
            &.adFont {
              cursor: auto;
              background-image: url('../../assets/ad.png');
              left: 0;
            }
            &.closeBtn {
              cursor: pointer;
              background-image: url('../../assets/close.png');
              right: 0;
              background-position: right;
            }
          }
        }
        #mask {
          width: 100%;
          height: 100%;
          background: url('../../../src/assets/loading.gif') no-repeat center;
          background-color: #000;
          opacity: .8;
        }
        .entranceBox {
          width: 100%;
          height: 100%;
          display: none;
          text-align: left;
          .jsgif {
            width: 100%;
            height: 100%;
          }
        }
        .displayBox {
          width: 100%;
          height: 100%;
          display: none;
          text-align: left;
          .jsgif {
            width: 100%;
            height: 100%;
          }
        }
      } // end theme
    } // end logoBg
  } 
</style>