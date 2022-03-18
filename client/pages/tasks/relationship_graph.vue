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

<script lang="ts">
import { useProgramCode } from '../../http/relationship_graph'

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
