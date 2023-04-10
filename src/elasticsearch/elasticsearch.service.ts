import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private indexName = 'posts';

  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  /**
   * @param queryString
   */
  async search(queryString: string): Promise<any[]> {
    try {
      const result: any = await this.elasticsearchService.search({
        index: this.indexName,
        body: {
          query: {
            query_string: {
              query: queryString,
              fields: ['firstName', 'lastName'],
            },
          },
        },
      });
      return result?.hits?.hits?.map((item: any) => item?._source);
    } catch (error) {
      throw error;
    }
  }
}
