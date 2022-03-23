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
        @delete-parent="deleteParentHandler"
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
  addParent,
  deleteParent
} from '~/requests/relationship_graph'
import { Node, InputPerson, DeletedObjects } from '~/api'
import PersonsGraph from '~/components/PersonsGraph.vue'

definePageMeta({
  title: 'Relationship graph'
})

const { data: persons } = await usePersons()
const { data: parents } = await useParents()
const { data: programCode } = await useProgramCode()

const deleteObjects = (deletedObjects: DeletedObjects) => {
  persons.value = persons.value.filter(
    (person) =>
      !deletedObjects.person_ids.find((personId) => person._id === personId)
  )
  parents.value = parents.value.filter(
    (parent) =>
      !deletedObjects.parent_ids.find((parentId) => parent._id === parentId)
  )
}

const addPersonHandler = async (person: InputPerson) => {
  const newPerson = await addPerson({ requestBody: person })
  persons.value = [...persons.value, newPerson]
}

const movePersonHandler = async (personId: string, node: Node) => {
  await movePerson({
    personId,
    requestBody: node
  })
}

const deletePersonHandler = async (personId: string) => {
  const deletedObjects = await deletePerson({ personId })
  deleteObjects(deletedObjects)
}

const addParentHandler = async (parentId: string, childId: string) => {
  const newParent = await addParent({ parentId, childId })
  parents.value = [...parents.value, newParent]
}

const deleteParentHandler = async (parentId: string) => {
  const deletedObjects = await deleteParent({ parentId })
  deleteObjects(deletedObjects)
}
</script>
