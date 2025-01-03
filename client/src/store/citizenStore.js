
import { defineStore } from 'pinia'
import { ref } from 'vue';
export const useCitizenStore = defineStore('citizen', () => {
    const citizen = ref(fetchCitizenFromServer());

    async function fetchCitizenFromServer() {
            return await fetch('http://localhost:8080/people')
            .then(response => response.json())
            .then(data => {return data})
            .catch(error => {
                console.log(error);
                return {};
            })
    }
    return { citizen };
})