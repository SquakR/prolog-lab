export async function useProgramCode() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphProgramCode', () =>
    $api.relationshipGraph.programCodeApiRelationshipGraphProgramCodeGet()
  )
  return { data }
}
