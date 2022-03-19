<template>
  <div ref="personsGraphEl" style="height: 500px; background: #f6f6f6" />
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import cytoscape from 'cytoscape'
import { Gender, Person } from '~/api'

const props = defineProps<{
  persons: Person[]
}>()

const personsGraph: Ref<cytoscape> = ref(null)
const personsGraphEl: Ref<HTMLDivElement> = ref(null)

onMounted(() => {
  personsGraph.value = cytoscape({
    container: personsGraphEl.value,
    elements: props.persons.map((person) => ({
      id: person._id,
      style: {
        'background-color': person.gender === Gender.MALE ? 'blue' : 'red'
      },
      data: person
    })),
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(name)'
        }
      }
    ]
  })
})
</script>
