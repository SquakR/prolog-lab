<template>
  <VApp>
    <VAppBar color="grey-lighten-2">
      <VImg src="logo.png" max-height="50" max-width="50" class="ml-2"></VImg>
      <VToolbarTitle>Prolog lab</VToolbarTitle>
    </VAppBar>
    <VNavigationDrawer color="grey-lighten-1" permanent></VNavigationDrawer>
    <VMain>
      <slot></slot>
    </VMain>
  </VApp>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped></style>
