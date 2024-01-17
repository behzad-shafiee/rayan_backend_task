import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity";
import { Post } from './post.entity';
import { BaseEnt } from "./base.entity";


@Entity()
export class Comment extends BaseEnt{
  
    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
}