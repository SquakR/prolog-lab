<template>
  <VContainer>
    <VRow>
      <VCol>
        <div>Hello World</div>
        <div>Value: {{ value }}</div>
        <VBtn color="primary" @click="inc">Inc</VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref(0)
    const inc = (): void => {
      value.value++
    }

    return {
      value,
      inc
    }
  }
})
</script>
