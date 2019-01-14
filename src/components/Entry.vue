<template>
<!--Logined-->
    <!--Without Login-->
    <div class>
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
            @click="$router.push('/register')"
            />
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Entry',
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  }
}
</script>

<style scoped>
    .q-btn {
        margin-right: 5px;
    }
</style>
