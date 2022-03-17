<template>
  <div>Tasks Index</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware() {
    return navigateTo({ name: 'tasks-relationship_graph' })
  }
})
</script>
