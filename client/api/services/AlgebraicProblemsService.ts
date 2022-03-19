/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AlgebraicProblemsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Program Code
   * @returns any Successful Response
   * @throws ApiError
   */
  public programCodeApiAlgebraicProblemsProgramCodeGet(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/algebraic_problems/program_code/',
    });
  }

}