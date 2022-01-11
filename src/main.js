import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import EditRecipeDialog from './components/recipes/EditRecipeDialog.vue';

library.add(fas)
const app = createApp(App);
app.use(router);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('edit-recipe-dialog', EditRecipeDialog);

app.mount("#app");
