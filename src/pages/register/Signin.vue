<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="login">
        <div class="form-control" :class="{ invalid: !formIsValid }">
          <label for="email">E-mail:</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            @blur="clearValidity"
          />
        </div>
        <div class="form-control" :class="{ invalid: !formIsValid }">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @blur="clearValidity"
          />
        </div>
        <p v-if="!formIsValid">Please input valid data.</p>
        <p v-if="!validUser">
          There is no account within this email, Please sign up first!
        </p>
        <base-button type="submit">Login</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      validUser: true,
      formIsValid: true,
      isLoading: false,
      error: null
    };
  },
  methods: {
    clearValidity() {
      this.formIsValid = true;
    },
    async login() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password === ""
      ) {
        this.formIsValid = false;
        return;
      }
      const userData = {
        email: this.email,
        password: this.password
      }
      this.isLoading = true;
      try{
        await this.$store.dispatch('login', userData);  
      } catch(err) {
        this.error = err.message || 'Failed to authenticate, try later.'
      }
      this.isLoading = false;
      this.$router.replace('/myRecipes');
      
    },
    handleError(){
      this.error = null;
    }
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  letter-spacing: 1px;
  color: #aaa;
}

input {
  display: block;
  width: 100%;
  border: none;
  font: inherit;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.invalid label {
  color: rgba(255, 0, 0, 0.924);
}

.invalid input {
  border: 1px solid rgba(255, 0, 0, 0.924);
}
</style>
