const prefix = 'lists/'

export async function useProgramCode() {
  const { $fetch } = useNuxtApp()
  const { data } = await useAsyncData('ListsProgramCode', () =>
    $fetch(prefix + 'program_code/')
  )
  return { data }
}
