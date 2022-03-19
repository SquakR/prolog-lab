export async function usePersons() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphPersons', () =>
    $api.relationshipGraph.personsApiRelationshipGraphPersonsGet()
  )
  return { data }
}

export async function useProgramCode() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphProgramCode', () =>
    $api.relationshipGraph.programCodeApiRelationshipGraphProgramCodeGet()
  )
  return { data }
}
