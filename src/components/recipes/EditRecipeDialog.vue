<template>
    <base-dialog :show="editDialog" title="Editing..." >
          <template #default>
            <div>
              <label for="title">Title</label>
              <input type="text" id="title" v-model="editedTitle"/>
            </div>
            <div>
              <label for="description">Description</label>
              <textarea  id="description" v-model="editedDescription" />
            </div>
          </template>
          <template #actions>
            <base-button @click="onSaveChanges">Save</base-button>
            <base-button @click="cancel">Cancel</base-button>
          </template>
    </base-dialog>
</template>
<script>

export default{
    props: ['recipe'],
    emits: ['close'],
    data(){
        return {
            editDialog: true,
            editedTitle: this.recipe.title,
            editedDescription: this.recipe.description
        }
    },
    methods: {
        async onSaveChanges() {
            if(this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                return
            }
            this.editDialog = false;
            await this.$store.dispatch('recipes/updateRecipeData', {
                id: this.recipe.id,
                title: this.editedTitle,
                description: this.editedDescription
            })   
            this.$emit('close');
        },
       cancel(){
           this.$emit('close');
           this.editDialog = false;
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
label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  letter-spacing: 1px;
  color: rgb(221, 234, 238);
}
</style>