<template>
  <VMain>Index</VMain>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Index',
  middleware() {
    return navigateTo({ name: 'tasks-relationship_graph' })
  }
})
</script>
