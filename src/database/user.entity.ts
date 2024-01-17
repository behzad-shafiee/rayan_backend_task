import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEnt } from './base.entity';
import { Comment } from './comment.entity';
import { Post } from './post.entity';

@Entity()
export class User extends BaseEnt {
  
  @Column({ type: String, unique: true, nullable: false })
  username: string;

  @Column({ type: String, unique: true, nullable: false })
  email: string;

  @Column({ type: String, unique: false, nullable: false })
  password: string;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
}
