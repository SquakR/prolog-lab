<template>
  <VRow>
    <VCol cols="6">
      <h1>Lists</h1>
    </VCol>
    <VCol cols="6">
      <h1>Prolog code</h1>
      <highlightjs language="prolog" :code="programCode" />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { useProgramCode } from '@/http/lists'

definePageMeta({
  title: 'Lists'
})

const { data: programCode } = await useProgramCode()
</script>
