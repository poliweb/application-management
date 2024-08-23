<template>
  <div class="flex items-center justify-center h-screen bg-[url('/public/img/bg_body.jpeg')] bg-center bg-no-repeat bg-cover">
    <div class="login-page">
      <form @submit.prevent="submitLogin">
        <input v-model="username" type="text" placeholder="Телефон или Логин"  autocomplete="username" />
        <input v-model="password" type="password" placeholder="Пароль" autocomplete="current-password" />
        <button type="submit">Войти</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async submitLogin() {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });
        this.$router.push('/');
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 340px;
  margin: 0 auto;
}
</style>
