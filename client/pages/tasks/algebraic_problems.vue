<template>
  <VRow>
    <VCol cols="6">
      <h1>Algebraic problems</h1>
    </VCol>
    <VCol cols="6">
      <h1>Prolog code</h1>
      <highlightjs language="prolog" :code="programCode" />
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { useProgramCode } from '~/data/algebraic_problems'

definePageMeta({
  title: 'Algebraic problems'
})

const { data: programCode } = await useProgramCode()
</script>
