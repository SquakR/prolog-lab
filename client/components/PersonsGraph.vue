<template>
  <div class="persons-graph">
    <div ref="personsGraphEl" class="graph panel" />
    <div class="elevation-1 pa-2 panel control">
      Control
      <ol>
        <li>Double click an empty space to add a person.</li>
        <li>Double click a node to delete a person.</li>
        <li>
          Click a parent node and then a child node to create a parent
          relationship.
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import cytoscape, { Core, EventObjectNode } from 'cytoscape'
import { Gender, Person } from '~/api'

const props = defineProps<{
  persons: Person[]
}>()

const emit = defineEmits<{
  (e: 'addPerson', name: string, gender: Gender): void
  (e: 'deletePerson', id: string): void
}>()

const personsGraph: Ref<Core> = ref(null)
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

  personsGraph.value.on('dblclick', 'node', (event: EventObjectNode) => {
    const person: Person = event.target.data()
    emit('deletePerson', person._id)
  })
})

const addPerson = (persons: Person[]) => {
  console.log(persons)
}

const deletePerson = (persons: Person[]) => {
  persons.forEach((person) => {
    personsGraph.value.remove(`node[_id = "${person._id}"]`)
  })
}

watch(
  () => props.persons,
  (newPersons, oldPersons) => {
    if (newPersons.length > oldPersons.length) {
      addPerson(
        newPersons.filter(
          (newPerson) =>
            !oldPersons.find((oldPerson) => newPerson._id === oldPerson._id)
        )
      )
    } else if (oldPersons.length > newPersons.length) {
      deletePerson(
        oldPersons.filter(
          (oldPerson) =>
            !newPersons.find((newPerson) => oldPerson._id === newPerson._id)
        )
      )
    }
  }
)
</script>

<style lang="sass">
.persons-graph
  height: 500px
  position: relative
  .graph
    width: 100%
    height: 100%
  .panel
    background: #f6f6f6
  .control
    position: absolute
    left: 2px
    top: 2px
    max-width: 70%
    list-style-position: inside
</style>
