
import { defineStore } from 'pinia'
import { ref} from 'vue';
export const useCitiesStore = defineStore('cities', () => {
    const cities = ref(fetchCitiesFromServer());

    async function fetchCitiesFromServer() {
            return await fetch('http://localhost:8080/cities')
            .then(response => response.json())
            .then(data => {return data})
            .catch(error => {
                console.log(error);
                return {};
            })
    }
    return { cities };
})