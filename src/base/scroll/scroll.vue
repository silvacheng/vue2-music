<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: { // 截流
        type: Number,
        default: 1
      },
      click: { // 点击
        type: Boolean,
        default: true
      },
      listenScroll: { // 监听
        type: Boolean,
        default: false
      },
      data: { // 歌单列表数据
        type: Array,
        default: null
      },
      pullup: { // 向上滑动
        type: Boolean,
        default: false
      },
      beforeScroll: { // 滚动开始前
        type: Boolean,
        default: false
      },
      refreshDelay: { // 刷新延迟
        type: Number,
        default: 20
      }
    },
    mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() { // 初始化
        if (!this.$refs.wrapper) { // 如果组件还没被渲染的时候  不能初始化scroll组件
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) { // 监听滚动
          let self = this // 备份指针
          this.scroll.on('scroll', (pos) => { // 监听滚动事件回调
            self.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() { // 禁用
        this.scroll && this.scroll.disable()
      },
      enable() { // 启动
        this.scroll && this.scroll.enable()
      },
      refresh() { // 重新计算
        this.scroll && this.scroll.refresh()
      },
      scrollTo() { // 滚动到某个位置
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() { // 滚动到某个元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => { // 强制 scroll 重新计算
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
