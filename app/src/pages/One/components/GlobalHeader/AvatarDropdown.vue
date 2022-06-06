<template>
  <div>
    <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
      <span class="ant-pro-account-avatar">
        <a-avatar size="small" :src="url" class="antd-pro-global-header-index-avatar" />
        <span>{{ currentUser.name }}</span>
      </span>
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
            <a-icon type="user" />个人中心
          </a-menu-item>
          <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
            <a-icon type="setting" />个人设置
          </a-menu-item> -->
          <!-- <a-menu-item key="password" @click="handleChangePassword"> <a-icon type="edit" />更改密码 </a-menu-item> -->
          <a-menu-divider v-if="menu" />
          <!-- <a-menu-item @click="handleChangePassword"> <a-icon type="logout" />修改密码 </a-menu-item> -->
          <a-menu-item key="setting" @click="handleSetting"><a-icon type="schedule" />用户设置</a-menu-item>
          <a-menu-item key="logout" @click="handleLogout"> <a-icon type="logout" />退出登录 </a-menu-item>
        </a-menu>
        <!-- <change-psg ref="changeModal"></change-psg> -->
      </template>
    </a-dropdown>
    <span v-else>
      <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
    </span>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      url: 'timg.jpg',
      visible: false,
      confirmLoading: false,
      mdl: null,
    }
  },
  methods: {
    handleToCenter() {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings() {
      this.$router.push({ path: '/account/settings' })
    },
    handleSetting() {
      // this.$router.push({ path: '/safety/setting' })
      this.$refs.changeModal.modalshow()
    },
    handleLogout(e) {
      Modal.confirm({
        title: '提醒',
        content: '确认退出登录！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then((res) => {
            localStorage.clear()

            window.location.href = res
            // this.$router.push({ name: 'user' })
          })
        },
        onCancel() {},
      })
    },
    handleChangePassword() {
      this.$refs.changeModal.modalshow()
      //this.$router.push({ path: '/management/setting/role' })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
