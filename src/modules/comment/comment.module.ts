import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/post.entity';
import { User } from 'src/database/user.entity';
import { Comment } from '../../database/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
