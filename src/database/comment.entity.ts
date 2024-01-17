import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEnt } from './base.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEnt {

  @Column({ nullable: false, type: String })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
  
}
