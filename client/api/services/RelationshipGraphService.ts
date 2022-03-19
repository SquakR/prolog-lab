/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Gender } from '../models/Gender';
import type { Person } from '../models/Person';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RelationshipGraphService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Persons
   * @returns Person Successful Response
   * @throws ApiError
   */
  public personsApiRelationshipGraphPersonsGet(): CancelablePromise<Array<Person>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/relationship_graph/persons/',
    });
  }

  /**
   * Add Person
   * @param name 
   * @param gender 
   * @returns Person Successful Response
   * @throws ApiError
   */
  public addPersonApiRelationshipGraphAddPersonPost(
name: string,
gender: Gender,
): CancelablePromise<Person> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/relationship_graph/add_person/',
      query: {
        'name': name,
        'gender': gender,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Person
   * @param personId 
   * @returns any Successful Response
   * @throws ApiError
   */
  public deletePersonApiRelationshipGraphDeletePersonDelete(
personId: string,
): CancelablePromise<any> {
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
   * Change Gender
   * @param personId 
   * @param gender 
   * @returns any Successful Response
   * @throws ApiError
   */
  public changeGenderApiRelationshipGraphChangeGenderPatch(
personId: string,
gender: Gender,
): CancelablePromise<any> {
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