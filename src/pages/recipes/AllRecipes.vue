<template>
<div>
  <base-card>
     <div class="deco">
        <h2>Welcome to The HOME of Recipes!</h2>
        <p>
          Take a look at all the recipes we have.Also you can add your own
          special recipes! Just register with us or login if you already have an
          account.
        </p>
    </div>
      <base-button link to="/new" v-if="isLoggedIn" >Create new recipe</base-button>
  </base-card>
    <div v-if="isLoading"> 
      <base-spinner></base-spinner>
    </div>
     <ul v-else-if="hasRecipe">
          <recipe-item
            v-for="recipe in getRecipes"
            :key="recipe.id"
          >
          <template #pic>
            <img :src="require(`../../assets/images/${recipe.img}.jpg`)" :alt="recipe.title" />
          </template>
          <template #details>
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.description }}</p>  
          </template>
          </recipe-item>
       </ul>
       <h3 v-else>No Recipe Found!</h3>
  </div>   
</template>

<script>
import RecipeItem from "../../components/recipes/RecipeItem.vue";

export default {
  components: { RecipeItem },
  data(){
    return {
      isLoading: false
    }
  },
  mounted(){
    this.loadRecipes();
  },
  methods: {
    async loadRecipes() {
      this.isLoading = true;
      await this.$store.dispatch("recipes/loadRecipes");
      this.isLoading = false;
  }
  },
  computed: {
    getRecipes() {
      return this.$store.getters["recipes/recipes"];
    },
    hasRecipe(){
      return !this.isLoading && this.$store.getters["recipes/hasRecipe"];
    },
    isLoggedIn(){
      return this.$store.getters["isAuthenticated"];
    }
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
.deco {
  margin: 0rem;
  text-align: justify;
  align-items: stretch;
  font-style: oblique;
}
img {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  object-fit: cover;
}
h3 {
  font-size: 1.5rem;
}

h3,
p {
  margin: 0.5rem 0;
}
</style>
