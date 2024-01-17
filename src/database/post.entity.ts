import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEnt } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Post extends BaseEnt {
  
  @Column({ nullable: false, type: String })
  title: string;

  @Column({ nullable: false, type: String })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];
}
