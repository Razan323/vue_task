<template>
  <header>
    <nav>
      <h1>Find your RECIPE</h1>
      <ul>
        <li v-for="item in menuItems" :key="item.title"><router-link :to="item.link">{{item.title}}</router-link></li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
      
    </nav>
  </header>
</template>
<script>
export default {
  
  computed: {
    menuItems(){
      let menuItems = [
        {title: "View Recipes", link: "/recipes"},
        {title: "Sign In", link: "/signin"},
        {title: "Sign Up", link: "/signup"}
      ]
      if(this.isLoggedIn) {
        menuItems =[ 
        {title: "View Recipes", link: "/recipes"},
        {title: "My Recipes", link: "/myRecipes"}
         ]
        return menuItems
      }
      return menuItems;

    },
    isLoggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace('/recipes')
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #19646063;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #04f8f8fb;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

li a:active,
a:hover,
a.router-link-active {
  border: 1px solid #04f8f8fb;
  border-radius: 0.2rem;
}

h1 {
  margin: 0;
  color: #048a8afb;
}

a:hover,
a:active,
a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
