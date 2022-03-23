import { RelationshipGraphService } from '~/api'

export async function usePersons() {
  const { $api } = useNuxtApp()
  return await useAsyncData('RelationshipGraphPersons', () =>
    $api.relationshipGraph.personsApiRelationshipGraphPersonsGet()
  )
}

export async function useParents() {
  const { $api } = useNuxtApp()
  return await useAsyncData('RelationshipGraphParents', () =>
    $api.relationshipGraph.parentsApiRelationshipGraphParentsGet()
  )
}

export async function useProgramCode() {
  const { $api } = useNuxtApp()
  return await useAsyncData('RelationshipGraphProgramCode', () =>
    $api.relationshipGraph.programCodeApiRelationshipGraphProgramCodeGet()
  )
}

export type AddPersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.addPersonApiRelationshipGraphAddPersonPost
>[0]
export function addPerson(parameter: AddPersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.addPersonApiRelationshipGraphAddPersonPost(
    parameter
  )
}

export type MovePersonPersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.movePersonApiRelationshipGraphMovePersonPatch
>[0]
export function movePerson(parameter: MovePersonPersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.movePersonApiRelationshipGraphMovePersonPatch(
    parameter
  )
}

export type DeletePersonParameter = Parameters<
  typeof RelationshipGraphService.prototype.deletePersonApiRelationshipGraphDeletePersonDelete
>[0]
export function deletePerson(parameter: DeletePersonParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.deletePersonApiRelationshipGraphDeletePersonDelete(
    parameter
  )
}

export type AddParentParameter = Parameters<
  typeof RelationshipGraphService.prototype.addParentApiRelationshipGraphAddParentPost
>[0]
export function addParent(parameter: AddParentParameter) {
  const { $api } = useNuxtApp()
  return $api.relationshipGraph.addParentApiRelationshipGraphAddParentPost(
    parameter
  )
}
