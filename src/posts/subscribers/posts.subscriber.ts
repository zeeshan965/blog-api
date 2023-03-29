import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Post } from '../entities/post.entity';

@EventSubscriber()
export class PostsSubscriber implements EntitySubscriberInterface<Post> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Post;
  }

  /**
   * Called before post update.
   */
  beforeUpdate(event: UpdateEvent<Post>) {
    event.entity.publishedAt = event.entity.published ? new Date() : null;
    console.log(`BEFORE POST UPDATE: `);
  }

  beforeInsert(event: InsertEvent<Post>) {
    event.entity.publishedAt = event.entity.published ? new Date() : null;
    console.log(`BEFORE POST INSERT: `);
  }
}
