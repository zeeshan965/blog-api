import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entity/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchService {
  /**
   * @private
   */
  private readonly indexName: string;

  /**
   * @param elasticsearchService
   * @param configService
   */
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
    configService: ConfigService,
  ) {
    this.indexName = configService.get('elastic_search_index');
  }

  /**
   * @param posts
   */
  async indexData(posts: Post[]) {
    try {
      // Create an Elasticsearch index with mapping
      await this.elasticsearchService.indices.create({
        index: this.indexName,
        mappings: {
          properties: {
            id: {
              type: 'text',
              fields: { keyword: { type: 'keyword', ignore_above: 256 } },
            },
            userId: {
              type: 'text',
              fields: { keyword: { type: 'keyword', ignore_above: 256 } },
            },
            firstName: { type: 'text' },
            lastName: { type: 'text' },
            postDescription: {
              type: 'text',
              fields: { keyword: { type: 'keyword', ignore_above: 256 } },
            },
            postTitle: {
              type: 'text',
              fields: { keyword: { type: 'keyword', ignore_above: 256 } },
            },
            createdAt: { type: 'date' },
            updatedAt: { type: 'date' },
          },
        },
      });

      // Transform data into Elasticsearch format
      const bulkData = posts.flatMap((post) => [
        { index: { _index: this.indexName, _id: post.id.toString() } },
        {
          userId: post.author?.id,
          firstName: post.author?.firstName,
          lastName: post.author?.lastName,
          id: post.id.toString(),
          postTitle: post?.title,
          postDescription: post?.description,
          createdAt: post?.createdAt,
          updatedAt: post?.updatedAt,
        },
      ]);

      // Index data in Elasticsearch
      await this.elasticsearchService.bulk({
        operations: bulkData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param post
   * @param user
   */
  async save(post: Post, user: User): Promise<void> {
    const data = {
      userId: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      id: post?.id,
      postTitle: post?.title,
      postDescription: post?.description,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
    const res = await this.elasticsearchService.index({
      index: this.indexName,
      id: post.id.toString(),
      document: data,
    });
    console.log(res);
  }

  /**
   * @param post
   */
  async update(post: Post): Promise<void> {
    const data = {
      postTitle: post?.title,
      postDescription: post?.description,
      updatedAt: post?.updatedAt,
    };
    await this.elasticsearchService.update({
      index: this.indexName,
      id: post.id.toString(),
      doc: data,
    });
  }

  /**
   * @param queryString
   */
  async search(queryString: string): Promise<string[]> {
    try {
      const result: any = await this.elasticsearchService.search({
        index: this.indexName,
        query: {
          multi_match: {
            query: queryString,
            fields: ['postTitle', 'postDescription', 'firstName', 'lastName'],
          },
        },
      });

      /*await this.elasticsearchService.search({
        index: this.indexName,
        query: {
          query_string: {
            query: queryString,
            fields: ['postTitle', 'postDescription'],
          },
        },
      });*/
      return result?.hits?.hits?.map((item: any) => item?._source?.id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param id
   */
  async remove(id: number): Promise<void> {
    try {
      await this.elasticsearchService.delete({
        index: this.indexName,
        id: id.toString(),
      });
    } catch (error) {
      throw error;
    }
  }
}
