export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      usersRecipes: [],
    };
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    hasRecipe(state) {
      return state.recipes && state.recipes.length > 0;
    },
    userRecipes(state) {
      return state.usersRecipes;
    },
    hasUserRecipes(state) {
      return state.usersRecipes && state.usersRecipes.length > 0;
    },
  },
  mutations: {
    loadRecipes(state, payload) {
      state.recipes = payload;
    },
    filterRecipes(state, recipeId) {
      state.usersRecipes = state.usersRecipes.filter(
        (rep) => rep.id !== recipeId
      );
    },
    updateRecipe(state, payload) {
      const updatedRecipe = state.usersRecipes.find(
        (res) => res.id === payload.id
      );
      updatedRecipe.title = payload.title;
      updatedRecipe.description = payload.description;
    },
    addNewRecipe(state, payload) {
      state.usersRecipes.push(payload);
    },
    loadUserRecipes(state, payload) {
      state.usersRecipes = payload;
    },
  },
  actions: {
    async loadRecipes(context) {
      const res = await fetch("http://localhost:3000/recipes", {
        method: "GET",
        headers: {
          'Accept': "application/json",
        },
      });
      const response = await res.json();
      context.commit("loadRecipes", response);
    },
    async deleteRecipe(context, payload) {
      await fetch(`http://localhost:3000/myRecipes/${payload}`, {
        method: "DELETE",
      });
      context.commit("filterRecipes", payload);
    },
    async updateRecipeData(context, payload) {
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      // Call Api to update
      const userToken = context.rootGetters.token;
      const response = await fetch(`http://localhost:3000/myRecipes/${payload.id}`,{
        method: 'PATCH',
        headers: {
          'Accept' : "application/json",
          'Content-Type': "application/json;charset=UTF-8",
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(updateObj)
      });
      const responseData = await response.json();
      if(!response.ok){
        const error = new Error(responseData.message);
        throw error;
      }
      context.commit("updateRecipe", payload);
    },
    async addNewRecipe(context, payload) {
      const userId = context.rootGetters.userId;
      const userToken = context.rootGetters.token;
      const response = await fetch("http://localhost:3000/660/myRecipes", {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          img: payload.img,
          userId: userId,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed.");
        throw error;
      }
      context.commit("addNewRecipe", {
        ...payload,
        userId: userId,
      });
    },
    async loadUserRecipes(context) {
      const userToken = context.rootGetters.token;
      const response = await fetch("http://localhost:3000/660/myRecipes",{
        method: 'GET',
        headers: {
          'Accept' : "application/json",
          'Content-Type': "application/json;charset=UTF-8",
          'Authorization': `Bearer ${userToken}`
        },
      });
      const responseData = await response.json();
      context.commit("loadUserRecipes", responseData);
    },
  },
};
