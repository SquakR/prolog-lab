/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ListsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Program Code
   * @returns any Successful Response
   * @throws ApiError
   */
  public programCodeApiListsProgramCodeGet(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/lists/program_code/',
    });
  }

}