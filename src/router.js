import { createRouter, createWebHistory } from "vue-router";
import AddRecipe from './pages/recipes/AddRecipe.vue';
import AllRecipes from './pages/recipes/AllRecipes.vue';
import MyRecipes from './pages/recipes/MyRecipes.vue';
import Signup from './pages/register/Signup.vue';
import Signin from './pages/register/Signin.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
history: createWebHistory(),
routes: [
    {path: '/', redirect: '/recipes'},
    {path:'/recipes', component: AllRecipes},
    {path: '/new', component: AddRecipe },
    {path: '/myRecipes', component: MyRecipes},
    {path:'/signup', component: Signup},
    {path: '/signin', component: Signin},
    {path:'/:notFound(.*)', component: NotFound}
]
});
export default router;