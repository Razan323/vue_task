<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <div>
        <h2>Register Now!</h2>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !firstName.isValid }">
          <label for="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            v-model.trim="firstName.val"
            @blur="clearValidity('firstName')"
          />
          <p v-if="!firstName.isValid">First name must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !lastName.isValid }">
          <label for="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            v-model.trim="lastName.val"
            @blur="clearValidity('lastName')"
          />
          <p v-if="!lastName.isValid">Last name must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <label for="email">Enter your E-Mail:</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.val"
            @blur="clearValidity('email')"
          />
          <p v-if="!email.isValid">Email must not be empty.</p>
        </div>
        <div class="form-control" :class="{ invalid: !password.isValid }">
          <label for="password">Enter your password:</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.val"
            @blur="clearValidity('password')"
          />
          <p v-if="!password.isValid">
            Password must not be empty, and more than 6 characters.
          </p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and submit again</p>
        <base-button>Register</base-button>
      </form>
    </base-card>
  </div>
</template>

<script> 

export default {
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
      isLoading: false,
      error: null
    };
  },
  methods: {
    clearValidity(input) {
         this[input].isValid = true;
            
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === "" || this.password.val.lenght < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        email: this.email.val,
        pass: this.password.val,
      };
      this.isLoading = true;
      this.isLoading = true;
      try{
        await this.$store.dispatch('signup', formData);  
      } catch(err) {
        this.error = err.message || 'Failed to authenticate, try later.'
      }
      this.isLoading = false;
      this.$router.replace("/recipes");

    },
    handleError(){
      this.error = null;
    },
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

h2 {
  margin: 0.5rem 0 1 1;
  color: rgb(3, 61, 57);
}

.invalid label {
  color: rgba(255, 0, 0, 0.924);
}

.invalid input{
  border: 1px solid rgba(255, 0, 0, 0.924);
}
</style>
