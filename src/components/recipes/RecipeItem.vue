<template>
  <li>
    <base-card>
    <div>
       <slot name="pic"></slot>
    </div>
    <div class="item_data">
      <slot name="details">
      </slot>
    </div> 
    <div class="actions">
    <slot name="actions">
    </slot>
    </div>
    </base-card>
  </li>
</template>
<script>

export default {
};
</script>
<style scoped>

li {
  margin: 1rem auto;
  padding: 1rem;
  text-align: center;
  max-width: 60rem;
  display: inline-block;
  flex-direction: row;
  
}
.item__data {
  display: flex;
  justify-content: space-between;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

div {
  display: inline-block;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
