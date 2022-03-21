import { RelationshipGraphService } from '~/api'

export async function usePersons() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphPersons', () =>
    $api.relationshipGraph.personsApiRelationshipGraphPersonsGet()
  )
  return { data }
}

type UseAddPersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.addPersonApiRelationshipGraphAddPersonPost
>[0]
export function useAddPerson(parameter: UseAddPersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.addPersonApiRelationshipGraphAddPersonPost(
    parameter
  )
}

type UseDeletePersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.deletePersonApiRelationshipGraphDeletePersonDelete
>[0]
export function useDeletePerson(parameter: UseDeletePersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.deletePersonApiRelationshipGraphDeletePersonDelete(
    parameter
  )
}

export async function useProgramCode() {
  const { $api } = useNuxtApp()
  const { data } = await useAsyncData('RelationshipGraphProgramCode', () =>
    $api.relationshipGraph.programCodeApiRelationshipGraphProgramCodeGet()
  )
  return { data }
}
