/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AlgebraicProblemsService } from './services/AlgebraicProblemsService';
import { ListsService } from './services/ListsService';
import { RelationshipGraphService } from './services/RelationshipGraphService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {

  public readonly algebraicProblems: AlgebraicProblemsService;
  public readonly lists: ListsService;
  public readonly relationshipGraph: RelationshipGraphService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.algebraicProblems = new AlgebraicProblemsService(this.request);
    this.lists = new ListsService(this.request);
    this.relationshipGraph = new RelationshipGraphService(this.request);
  }
}