<template>
  <VNavigationDrawer permanent>
    <VList height="100%" nav>
      <VListItem :to="{ name: 'tasks-relationship_graph' }">
        <VListItemHeader>
          <VListItemTitle>Relationship graph</VListItemTitle>
        </VListItemHeader>
      </VListItem>
      <VListItem :to="{ name: 'tasks-algebraic_problems' }">
        <VListItemHeader>
          <VListItemTitle>Algebraic problems</VListItemTitle>
        </VListItemHeader>
      </VListItem>
      <VListItem :to="{ name: 'tasks-lists' }">
        <VListItemHeader>
          <VListItemTitle>Lists</VListItemTitle>
        </VListItemHeader>
      </VListItem>
    </VList>
  </VNavigationDrawer>
  <VMain>
    <VContainer>
      <NuxtPage></NuxtPage>
    </VContainer>
  </VMain>
</template>

<script lang="ts" setup></script>
