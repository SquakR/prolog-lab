<template>
  <div>Hello World</div>
  <div>Value: {{ value }}</div>
  <input type="button" value="Inc" @click="inc" />
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
