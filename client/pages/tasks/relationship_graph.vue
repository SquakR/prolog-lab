<template>
  <VRow>
    <VCol cols="6">
      <h1>Relationship graph</h1>
      <PersonsGraph :persons="persons" />
    </VCol>
    <VCol cols="6">
      <h1>Prolog code</h1>
      <highlightjs language="prolog" :code="programCode" />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { usePersons, useProgramCode } from '~/data/relationship_graph'
import PersonsGraph from '~/components/PersonsGraph.vue'

definePageMeta({
  title: 'Relationship graph'
})

const { data: persons } = await usePersons()
const { data: programCode } = await useProgramCode()
</script>
