import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entity/user.entity';
import { PostSearchBody } from '../posts/interface/elastic.interface';

@Injectable()
export class ElasticsearchService {
  /**
   * @private
   */
  private indexName = 'posts';

  /**
   * @param elasticsearchService
   */
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

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
      document: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      },
    });
    console.log(res);
  }

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
