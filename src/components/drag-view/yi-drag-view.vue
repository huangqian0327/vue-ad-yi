<template>
  <div class="dragView">
    <div 
      id="container" 
      v-drag
      unselectable="on" 
      onselectstart="return false;" 
      style="-moz-user-select:none;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    directives: {
      drag: {
        inserted: (el, binding, vnode) => {
          let oDiv = document.querySelector('#container')
          let that = vnode.context
          that.maxLeft = oDiv.offsetLeft
          that.maxTop = oDiv.offsetTop

          oDiv.onmousedown = (e) => {
            let disX = e.clientX - oDiv.offsetLeft
            let disY = e.clientY - oDiv.offsetTop

            document.onmousemove = (e) => {
              let l = e.clientX - disX
              let t = e.clientY - disY
              oDiv.style.left = that.formateLeft(l) + 'px'
              oDiv.style.top = that.formateTop(t) + 'px'
            }
            document.onmouseup = () => {
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        }
        
      }
    },
    data () {
      return {
        maxLeft: '',
        maxTop: ''
      }
    },
    methods: {
      formateLeft (left) {
        if (left < 0) {
          left = 0
        } else if (left > this.maxLeft) {
          left = this.maxLeft
        }
        return left
      },
      formateTop (top) {
        if (top < 0) {
          top = 0
        } else if (top > this.maxTop) {
          top = this.maxTop
        }
        return top
      },
    },
    mounted () {
      document.body.onresize = () => {
        // document.querySelector('#container').style.left = window.innerWidth - 400 + 'px'
        // document.querySelector('#container').style.top =  window.innerHeight - 300 + 'px'
        this.maxLeft = window.innerWidth - 400
        this.maxTop = window.innerHeight - 300
        if (Number(document.querySelector('#container').style.left.replace('px', '')) > this.maxLeft) {
          document.querySelector('#container').style.left = this.maxLeft + 'px'
        }
        if (Number(document.querySelector('#container').style.top.replace('px', '')) > this.maxTop) {
          document.querySelector('#container').style.top = this.maxTop + 'px'
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .dragView {
    // position: relative;
    #container {
      width: 400px;
      height: 300px;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #f00;
      cursor: move;
      z-index: 999;
    }
  }
</style>