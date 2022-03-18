const prefix = 'relationship_graph/'

export async function useProgramCode() {
  const { $fetch } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphProgramCode', () =>
    $fetch(prefix + 'program_code/')
  )
  return { data }
}
