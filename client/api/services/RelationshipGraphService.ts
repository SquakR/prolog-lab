/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeletedObjects } from '../models/DeletedObjects';
import type { InputPerson } from '../models/InputPerson';
import type { Node } from '../models/Node';
import type { OutputPerson } from '../models/OutputPerson';
import type { Parent } from '../models/Parent';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RelationshipGraphService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Persons
   * @returns OutputPerson Successful Response
   * @throws ApiError
   */
  public personsApiRelationshipGraphPersonsGet(): CancelablePromise<Array<OutputPerson>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/relationship_graph/persons/',
    });
  }

  /**
   * Parents
   * @returns Parent Successful Response
   * @throws ApiError
   */
  public parentsApiRelationshipGraphParentsGet(): CancelablePromise<Array<Parent>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/relationship_graph/parents/',
    });
  }

  /**
   * Add Person
   * @returns OutputPerson Successful Response
   * @throws ApiError
   */
  public addPersonApiRelationshipGraphAddPersonPost({
requestBody,
}: {
requestBody: InputPerson,
}): CancelablePromise<OutputPerson> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/relationship_graph/add_person/',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Move Person
   * @returns OutputPerson Successful Response
   * @throws ApiError
   */
  public movePersonApiRelationshipGraphMovePersonPatch({
personId,
requestBody,
}: {
personId: string,
requestBody: Node,
}): CancelablePromise<OutputPerson> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/relationship_graph/move_person/',
      query: {
        'person_id': personId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Person
   * @returns DeletedObjects Successful Response
   * @throws ApiError
   */
  public deletePersonApiRelationshipGraphDeletePersonDelete({
personId,
}: {
personId: string,
}): CancelablePromise<DeletedObjects> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/relationship_graph/delete_person/',
      query: {
        'person_id': personId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Add Parent
   * @returns Parent Successful Response
   * @throws ApiError
   */
  public addParentApiRelationshipGraphAddParentPost({
parentId,
childId,
}: {
parentId: string,
childId: string,
}): CancelablePromise<Parent> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/relationship_graph/add_parent/',
      query: {
        'parent_id': parentId,
        'child_id': childId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Parent
   * @returns DeletedObjects Successful Response
   * @throws ApiError
   */
  public deleteParentApiRelationshipGraphDeleteParentDelete({
parentId,
}: {
parentId: string,
}): CancelablePromise<DeletedObjects> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/relationship_graph/delete_parent/',
      query: {
        'parent_id': parentId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Program Code
   * @returns any Successful Response
   * @throws ApiError
   */
  public programCodeApiRelationshipGraphProgramCodeGet(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/relationship_graph/program_code/',
    });
  }

}