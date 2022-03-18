const prefix = 'algebraic_problems/'

export async function useProgramCode() {
  const { $fetch } = useNuxtApp()
  const { data } = await useAsyncData('AlgebraicProblemsProgramCode', () =>
    $fetch(prefix + 'program_code/')
  )
  return { data }
}
