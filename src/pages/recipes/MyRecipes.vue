<template>
  <base-card>
  <div class="padd">
    <h3>Edit your recipes, delete or add more...</h3>
    <base-button link to="/new">Add</base-button>
  </div>
  </base-card>
  <div v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <ul v-else-if="hasUserRecipes">
    <recipe-item v-for="recipe in getUserRecipes" :key="recipe.id">
      <template #pic>
        <img :src="recipe.img" :alt="recipe.title" />
      </template>
      <template #details>
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
      </template>
      <template #actions>
        <span><button @click="editRecipe(recipe.id)">
            <font-awesome-icon :icon="['fas', 'edit']" /></button></span>
        <edit-recipe-dialog
          v-if="isEditing"
          :recipe="res"
          @close="close"
        ></edit-recipe-dialog>
        <span><button @click="deleteRecipe(recipe.id)">
            <font-awesome-icon :icon="['fas', 'trash-alt']" /></button
        ></span>
      </template>
    </recipe-item>
  </ul>
  <h3 v-else>No Recipe Found!</h3>
</template>
<script>
import RecipeItem from "../../components/recipes/RecipeItem.vue";
import EditRecipeDialog from "../../components/recipes/EditRecipeDialog.vue";



export default {
  components: { EditRecipeDialog, RecipeItem },
  data() {
    return {
      isEditing: false,
      isLoading: false,
      res: { }
    };
  },
  created() {
    this.loadUserRecipes();
  },
  methods: {
    async loadUserRecipes() {
      this.isLoading = true;
      await this.$store.dispatch("recipes/loadUserRecipes");
      this.isLoading = false;
    },
    deleteRecipe(id) {
      const confirmed = confirm("Are you sure you want to delete this recipe?");
      if (confirmed) {
        this.$store.dispatch("recipes/deleteRecipe", id);
      }
    },
    editRecipe(id) {
      const recipe = this.getUserRecipes.find( (res) => res.id === id);
      this.res = recipe;
      this.isEditing = true;
    },
    close() {
      this.isEditing = false;
    },
  },
  computed: {
    getUserRecipes() {
      return this.$store.getters["recipes/userRecipes"];
    },
    hasUserRecipes() {
      return this.$store.getters["recipes/hasUserRecipes"];
    },
  },
};
</script>
<style scoped>
.padd{
  padding: 25px;
}
button {
  background-color: white;
  border: none;
  cursor: pointer;
  margin: 10px;
}
.svg-inline--fa {
  align-self: start;
  color: gray;
  margin-inline: 0.8em;
}

img {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  object-fit: cover;
}

.item__data {
  display: flex;
  justify-content: space-between;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

h3 {
  font-size: 1.5rem;
}

h3,
p {
  margin: 0.5rem 0;
}

</style>
