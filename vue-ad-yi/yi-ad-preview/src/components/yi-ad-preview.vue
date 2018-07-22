<template>
  <div class="yi-ad-preview">
    <div class="bg" id="logo" v-if="type == 'logo'">
      <img v-if="bgUrl" :src="bgUrl" alt="">
      <div class="theme">theme
        <ul>
          <li v-if="resource" v-for="item in resource" class="resource">
            <img :src="item.url">
          </li>
        </ul>
      </div>
    </div>
    <div class="bg" id="bubble" v-if="type == 'bubble'">
      <img v-if="bgUrl" :src="bgUrl" alt="">
      <div class="theme">theme
        <ul>
          <li v-if="resource" v-for="item in resource" class="resource">
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
        type: String,
        required: true
      },
      height: {
        type: String,
        required: true
      },
      bgUrl: {
        type: String,
        required: true
      },
      bgWidth: String,
      bgHeight: String,
      bgX: String,
      bgY: String,
      type: String,
      resource: Array,
      theme: Array,
    },
    data () {
      return {
      
      }
    },
    methods: {
      setContainer () {
        let container = document.querySelector('.yi-ad-preview')
        container.style.width = this.width + 'px'
        container.style.height = this.height + 'px'
      },
      setBg () {
        let bg = document.querySelector('.yi-ad-preview .bg')
        bg.style.width = this.bgWidth + 'px'
        bg.style.height = this.bgHeight + 'px'
        bg.style.top = this.bgX + 'px'
        bg.style.left = this.bgY + 'px'
      },
      setTheme () {
        let theme = document.querySelectorAll('.yi-ad-preview .theme' )
        this.theme.forEach((item, index) => {
          theme[index].style.width = item.width + 'px'
          theme[index].style.height = item.height + 'px'
          theme[index].style.top = item.y + 'px'
          theme[index].style.left = item.x + 'px'
        })
      },
      setResource () {
        let resource = document.querySelectorAll('.yi-ad-preview .resource')
        this.resource.forEach((item, index) => {
          resource[index].style.width = item.width + 'px'
          resource[index].style.height = item.height + 'px'
          resource[index].style.top = item.y + 'px'
          resource[index].style.left = item.x + 'px'
        })
      },
    },
    mounted () {
      setTimeout(() => {
        this.setContainer()
        this.setBg()
        this.setTheme()
        this.setResource()
      }, 0)

    }
  }
</script>

<style lang="less" scoped>
  
  @keyframes logo {
    from {
      left: -200px;
    }
    to {
      left: 0;
    }
  }

  @keyframes bubble {
    from {
      top: 200px;
    }
    to {
      top: 100px;
    }
  }
  

  .yi-ad-preview {
    position: relative;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #bubble {
      position: absolute;
      background-color: #aaa;
      
      img {
        width: 100%;
        height: 100%;
      }
      .theme {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #999;
        ul {
          margin: 0;
          padding: 0;
          .resource {
            list-style: none;
            position: absolute;
            top: 0;
            left: 0;
            animation: bubble 2s infinite;
            img {
              width: 100%;
              height: 100%
            }
          }
        } // end ul
      } // end theme
    } // end bubbleBg
    #logo {
      position: absolute;
      background-color: #aaa;
      
      img {
        width: 100%;
        height: 100%;
      }
      .theme {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #999;
        ul {
          margin: 0;
          padding: 0;
          .resource {
            list-style: none;
            position: absolute;
            top: 0;
            left: 0;
            animation: logo 2s infinite;
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