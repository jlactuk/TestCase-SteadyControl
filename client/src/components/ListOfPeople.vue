<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useCitizenStore } from '../store/citizenStore';
import { useCitiesStore } from '../store/citiesStore';
import ListItem from './ListItem.vue';

const citizenStore = useCitizenStore(),
  citiesStore =  useCitiesStore(),
  cities = ref(),
  sortedPeople = ref([]);


function sortingPeople(people) {
  
  return people.reduce((sorted, item) => {
    let currentLevel = sorted;

    item.groups.forEach((group, index : Number) => {
      const key : String = group.name;

      if (!currentLevel[key]) {
        currentLevel[key] = index === item.groups.length - 1 ? [] : {};
      }

      if (index === item.groups.length - 1) {
        item.population = getPopulation(item.city_id);
        currentLevel[key].push(item);
      }
       else {
        currentLevel = currentLevel[key];
      }
    });

    return sorted;
  }, {});
}
 function getPopulation(idCity : Number) {
  const neededCity = cities.value.find(item  => item.id === idCity);
  return neededCity?.data || 'Unknown';
}

onBeforeMount(async () => {
   cities.value = await citiesStore.cities;
   sortedPeople.value = sortingPeople(await citizenStore.citizen);
})
</script>

<template>
  <div class="card">
    <ol class="cities">
      <ListItem :data="sortedPeople"></ListItem>
    </ol>
  </div>
</template>
