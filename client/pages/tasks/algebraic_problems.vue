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

<script lang="ts">
import { useProgramCode } from '../../http/algebraic_problems'

export default defineComponent({
  async setup() {
    useMeta({ title: 'Relationship graph' })
    const { data: programCode } = await useProgramCode()
    return {
      programCode
    }
  }
})
</script>
