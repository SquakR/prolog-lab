/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from '../models/Gender';
import type { InputPerson } from '../models/InputPerson';
import type { Node } from '../models/Node';
import type { OutputPerson } from '../models/OutputPerson';

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
   * Delete Person
   * @returns any Successful Response
   * @throws ApiError
   */
  public deletePersonApiRelationshipGraphDeletePersonDelete({
personId,
}: {
personId: string,
}): CancelablePromise<any> {
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
   * Move
   * @returns any Successful Response
   * @throws ApiError
   */
  public moveApiRelationshipGraphMovePatch({
personId,
requestBody,
}: {
personId: string,
requestBody: Node,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/relationship_graph/move',
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
   * Change Gender
   * @returns any Successful Response
   * @throws ApiError
   */
  public changeGenderApiRelationshipGraphChangeGenderPatch({
personId,
gender,
}: {
personId: string,
gender: Gender,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/relationship_graph/change_gender/',
      query: {
        'person_id': personId,
        'gender': gender,
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