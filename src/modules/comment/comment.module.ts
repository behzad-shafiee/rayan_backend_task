import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../database/comment.entity';
import { User } from 'src/database/user.entity';
import { Post } from 'src/database/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
