<template>
<!--Logined-->
    <!--Without Login-->
    <div class>
        <div v-if="auth">
            <q-btn
                flat
                color="withe"
                size="md"
            >
                <span v-if="user.name">{{ user.name }}</span>
            </q-btn>
            <q-btn
                flat
                color="white"
                size="md"
                label="Logout"
                icon="fas fa-sign-in-alt"
                @click="logout" />
        </div>
        <div v-else>
        <q-btn
            flat
            color="withe"
            label="Login"
            size="md"
            icon="fas fa-sign-in-alt"
            @click="$router.push('/login')"
            >
        </q-btn>
        <q-btn
            flat
            color="withe"
            label="Registe"
            icon="fas fa-user-plus"
            @click="$router.push('/auth/register')"
            />
        </div>
    </div>
</template>
<script>

export default {
  name: 'Entry',
  computed: {
    auth () {
      return this.$store.state.user.auth
    },
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style scoped>
    .q-btn {
        margin-right: 5px;
    }
</style>
