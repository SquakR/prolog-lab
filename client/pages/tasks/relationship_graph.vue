<template>
  <VRow>
    <VCol cols="6">
      <h1>Relationship graph</h1>
      <PersonsGraph
        :persons="persons"
        :parents="parents"
        @add-person="addPersonHandler"
        @move-person="movePersonHandler"
        @delete-person="deletePersonHandler"
        @add-parent="addParentHandler"
      />
    </VCol>
    <VCol cols="6">
      <h1>Prolog code</h1>
      <highlightjs language="prolog" :code="programCode" />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import {
  usePersons,
  useParents,
  useProgramCode,
  addPerson,
  movePerson,
  deletePerson,
  addParent
} from '~/requests/relationship_graph'
import { Node, InputPerson } from '~/api'
import PersonsGraph from '~/components/PersonsGraph.vue'

definePageMeta({
  title: 'Relationship graph'
})

const { data: persons } = await usePersons()
const { data: parents } = await useParents()
const { data: programCode } = await useProgramCode()

const addPersonHandler = async (person: InputPerson) => {
  const newPerson = await addPerson({ requestBody: person })
  persons.value = [...persons.value, newPerson]
}

const movePersonHandler = async (personId: string, node: Node) => {
  await movePerson({
    personId: personId,
    requestBody: node
  })
}

const deletePersonHandler = async (personId: string) => {
  const deletedObjects = await deletePerson({ personId: personId })
  persons.value = persons.value.filter(
    (person) =>
      !deletedObjects.person_ids.find((personId) => person._id === personId)
  )
  parents.value = parents.value.filter(
    (parent) =>
      !deletedObjects.parent_ids.find((parentId) => parent._id === parentId)
  )
}

const addParentHandler = async (parentId: string, childId: string) => {
  const newParent = await addParent({ parentId, childId })
  parents.value = [...parents.value, newParent]
}
</script>
