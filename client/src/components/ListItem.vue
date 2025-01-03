<script setup lang="ts">
const props = defineProps({
  data: Object,
});
</script>

<template>
  <ol>
    <li v-for="(item, key) in data" :key="key">
      <span>{{ key }}</span>
      <ol v-if="!Array.isArray(item)">
        <ListItem :data="item" />
      </ol>
      <ul v-else>
        <li v-for="human in item" :key="human.id" v-bind:data-population="human.population" class="human">{{ human.name }}</li>
      </ul>
    </li>
  </ol>
</template>
