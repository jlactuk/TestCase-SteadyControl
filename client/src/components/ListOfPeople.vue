<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useCitizenStore } from '../store/citizenStore';
import { useCitiesStore } from '../store/citiesStore';

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
      <li v-for="(districts, city) in sortedPeople" :key="city">
        <div>{{ city }}</div>
        
        <ol class="districts">
        
          <li v-for="(streets, district) in districts" :key="district">
            <div>{{ district }}</div>
            
            <ol class="streets">
              
              <li v-for="(citizens, street) in streets" :key="street">
                <div>{{ street }}</div>
                
                <ul class="people">
                  <li v-for="human in citizens" :key="human.id" v-bind:data-population="getPopulation(human.id)">{{ human.name }}</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}
.people li {
  position: relative;

}
.people li:hover::before {
  transition: .5s all;
  content: attr(data-population);
  position: absolute;
  top: 50%;
  right: -50%;
  transform: translateY(-50%);
  background: #000;
  color: white;
}

</style>
