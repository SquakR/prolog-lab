export async function useProgramCode() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('AlgebraicProblemsProgramCode', () =>
    $api.algebraicProblems.programCodeApiAlgebraicProblemsProgramCodeGet()
  )
  return { data }
}
