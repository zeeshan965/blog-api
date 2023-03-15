import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Post } from '../entities/post.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
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
    console.log(`BEFORE POST UPDATE: lol`);
  }
}
