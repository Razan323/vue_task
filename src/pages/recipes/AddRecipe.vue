<template>
   <base-card>
   <form @submit.prevent="onUpload">
      <div>
        <input type="text" placeholder="Name" v-model.trim="recipeName">
        <textarea placeholder="Description" v-model.trim="recipeDesc"></textarea>
      </div>
      <div>
      <input type="file" @change="onFileSelected"  />
      <img :src="recipeImage" height="150" />
      </div>
    
      <base-button :mode="!formIsValid">Save</base-button>
    </form>
   </base-card>
   
</template>
<script>
import BaseButton from '../../components/ui/BaseButton.vue';
export default{
  components: { BaseButton },
  data() {
    return {
      selectedFile: null,
      recipeName: '',
      recipeDesc: '',
      recipeImage: ''
    }
  },
  computed: {
    formIsValid() {
      return this.recipeName !== '' && this.recipeDesc !== '' && this.recipeImage !== ''
    }
  },
  methods: {
    onFileSelected(event){
      console.log(event);
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.recipeImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      
    },
    async onUpload(){
      const newRecipeData = {
        title: this.recipeName,
        description: this.recipeDesc,
        img: this.recipeImage,
        
      }
      await this.$store.dispatch('recipes/addNewRecipe', newRecipeData)
      this.$router.replace('/myRecipes');
    
  }
}
}

</script>
<style scoped>
input, textarea {
  display: block;
  width: 100%;
  border: none;
  font: inherit;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  color: #555;
  margin-top: 2em;
  margin-bottom: 1em;
}
textarea{
  resize: none;
  height: 200px;
}


</style>