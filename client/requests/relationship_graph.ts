import { RelationshipGraphService } from '~/api'

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

type AddPersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.addPersonApiRelationshipGraphAddPersonPost
>[0]
export function addPerson(parameter: AddPersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.addPersonApiRelationshipGraphAddPersonPost(
    parameter
  )
}

type MovePersonPersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.movePersonApiRelationshipGraphMovePersonPatch
>[0]
export function movePerson(parameter: MovePersonPersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.movePersonApiRelationshipGraphMovePersonPatch(
    parameter
  )
}

type DeletePersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.deletePersonApiRelationshipGraphDeletePersonDelete
>[0]
export function deletePerson(parameter: DeletePersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.deletePersonApiRelationshipGraphDeletePersonDelete(
    parameter
  )
}
