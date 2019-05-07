<template>
<!--Logined-->
    <!--Without Login-->
    <div class>
        <div v-if="auth">
            <q-btn
                flat
                color="deep-purple-7"
                size="md"
                icon="fas fa-user"
                :label="user.name" />
                <q-btn
                  flat
                  color="deep-purple-7"
                  size="md"
                  label="My Dashboard"
                  icon="fas fa-crown"
                  @click="$router.push({ name: 'dashboard', params: { username: user.name } })"/>
                <!-- <span v-if="user.name">{{ user.name }}</span> -->
            <q-btn
                outline
                color="deep-purple-7"
                size="md"
                label="Logout"
                icon="fas fa-sign-in-alt"
                @click="logout" />
        </div>
        <div v-else>
          <q-btn
            class="q-ma-sm"
            flat
            color="deep-purple-7"
            label="Registe"
            icon="fas fa-user-plus"
            @click="$router.push('/auth/register')"
          />
        <q-btn
            class="q-ma-sm"
            outline
            color="deep-purple-7"
            label="Login"
            icon="fas fa-sign-in-alt"
            @click="$router.push('/auth/login')"
            >
        </q-btn>
        </div>
    </div>
</template>
<script>

export default {
  name: 'Entry',
  props: [ 'username' ],
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
/* .userlist {
  background-color: #4527a0;
  padding-top:10px;
  box-shadow: none;
  border-radius: 0px;
} */
</style>
