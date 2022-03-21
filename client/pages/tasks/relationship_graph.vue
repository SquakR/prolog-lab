<template>
  <VRow>
    <VCol cols="6">
      <h1>Relationship graph</h1>
      <PersonsGraph
        :persons="persons"
        @add-person="addPerson"
        @delete-person="deletePerson"
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
  useAddPerson,
  useDeletePerson,
  useProgramCode
} from '~/requests/relationship_graph'
import { InputPerson } from '~/api'
import PersonsGraph from '~/components/PersonsGraph.vue'

definePageMeta({
  title: 'Relationship graph'
})

const { data: persons } = await usePersons()
const { data: programCode } = await useProgramCode()

const addPerson = async (person: InputPerson) => {
  const newPerson = await useAddPerson({ requestBody: person })
  persons.value = [...persons.value, newPerson]
}

const deletePerson = async (id: string) => {
  const deleteId = await useDeletePerson({ personId: id })
  persons.value = persons.value.filter((person) => person._id !== deleteId)
}
</script>
