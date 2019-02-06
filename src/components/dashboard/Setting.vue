<template>
  <q-page>
      <h4 style="margin-left:50px; margin-top: 100px; color:gray">
          <b>Account Setting</b>
          <i class="fas fa-user-edit q-ma-md"></i>
        </h4>
      <hr style="color:gray">
      <div class="account-setting">
        <q-list>
          <q-list-header>
            <i class="fas fa-user q-ma-sm"></i>
            User Name: 123
          </q-list-header>
          <q-item-separator />
          <q-item style="padding:0 200px">
            <q-item-side />
            <q-item-main class="change-input">
              <q-field
                icon="cloud"
                label="Change My Passwords"
                :label-width="3"
              >
                <q-input color="deep-purple-6" v-model="model" />
              </q-field>
            </q-item-main>
            <q-item-side />
            <q-item-separator />
          </q-item>
          <q-item-separator />
          <q-item style="padding:0 200px">
            <q-item-side />
            <q-item-main class="change-input">
              <q-field
                icon="cloud"
                label="Vertify My passwords"
                :label-width="3"
              >
                <q-input color="deep-purple-6" v-model="model" />
              </q-field>
            </q-item-main>
            <q-item-side />
            <q-item-separator />
          </q-item>
          <q-item-separator />
          <q-item>
            <q-item-side></q-item-side>
            <q-item-main></q-item-main>
            <q-item-side right>
              <q-btn
                label="Save"
                color="deep-purple-6"
              />
            </q-item-side>
          </q-item>
        </q-list>
      </div>
  </q-page>
</template>
<style scoped>
.account-setting {
  padding: 50px 200px;
}
.change-input{
  margin: 20px 0px
}
</style>
