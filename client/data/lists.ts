export async function useProgramCode() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('ListsProgramCode', () =>
    $api.lists.programCodeApiListsProgramCodeGet()
  )
  return { data }
}
