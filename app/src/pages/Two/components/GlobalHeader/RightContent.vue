<template>
  <div :class="wrpCls">
    <a-menu style="float: left; border-bottom: none; line-height: 62px" v-model="menukey" mode="horizontal">
      <a-menu-item key="one" @click="handleJump">系统1</a-menu-item>
      <a-menu-item key="two" @click="handleJump">系统2</a-menu-item>
    </a-menu>
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    menutype: {
      type: String,
      default: 'two',
    },
  },
  data() {
    return {
      showMenu: true,
      currentUser: {},
      menukey: [this.menutype],
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true,
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.currentUser = {
        name: this.$store.getters.userInfo.name,
      }
    }, 1500)
  },
  methods: {
    handleJump(item) {
      if (item.key) {
        this.$emit('system-change', item.key)
      }
    },
  },
}
</script>
