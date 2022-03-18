<template>
  <VRow>
    <VCol cols="6">
      <h1>Relationship graph</h1>
    </VCol>
    <VCol cols="6">
      <h1>Prolog code</h1>
      <highlightjs language="prolog" :code="programCode" />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { useProgramCode } from '@/http/relationship_graph'

definePageMeta({
  title: 'Relationship graph'
})

const { data: programCode } = await useProgramCode()
</script>
