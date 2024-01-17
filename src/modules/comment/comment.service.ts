import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/comment.entity';
import { Post } from 'src/database/post.entity';
import { User } from 'src/database/user.entity';
import { DataSource } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    @InjectRepository(User)
    @InjectRepository(Post)
    private dataSource: DataSource,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.dataSource.manager.findOne(User, {
      where: { id: createCommentDto.user_id },
    });
    if (!user) throw new BadRequestException('user id is wrong');

    const post = await this.dataSource.manager.findOne(Post, {
      where: { id: createCommentDto.user_id },
    });
    if (!user) throw new BadRequestException('user id is wrong');
    const comment = new Comment();
    comment.content = createCommentDto.content;
    await this.dataSource.manager.save(comment);
    return {
      message: 'comment created',
      comment,
    };
  }
}
