import { createStore } from "vuex";
import recipesModule from "./modules/recipes.js";
import registerModule from "./modules/register.js";
// import {VuexPersistence} from 'vuex-persist';
// const vuexLocal = VuexPersistence({
//   storage: window.localStorage
// });
const store = createStore({
  modules: {
    recipes: recipesModule,
    register: registerModule,
  }
 
});
export default store;
