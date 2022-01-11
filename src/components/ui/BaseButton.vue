<template>
    <button v-if="!link" :disabled="mode" >
        <slot></slot>
    </button>
    <router-link v-else :to="to" >
        <slot></slot>
    </router-link>
</template>

<script>
export default{
    props:{
        mode: {
            type: Boolean,
            required: false,
            default: false
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    },
    data(){
        return{
            buttonEnable: true
        }
    }
}
</script>
<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #038c91;
  border: 1px solid #038c91;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #65abad;
  border-color: #65abad;
}
button:disabled,
button[disabled]{
  border: 1px solid #dddcdc;
  background-color: #dddcdc;
  color: #666666;
  cursor: default;
}

</style>