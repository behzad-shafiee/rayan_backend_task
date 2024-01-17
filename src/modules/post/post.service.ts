import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { DataSource } from 'typeorm';
import { Post } from '../../database/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    @InjectRepository(Post)
    private dataSource: DataSource,
  ) {}

  async create(createPostDto: CreatePostDto) {
    let post: Post;
    const connection = this.dataSource.manager.connection;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { id: createPostDto.user_id },
      });
      if (!user) throw new BadRequestException('user id is wrong');

      post = new Post();
      post.content = createPostDto.content;
      post.title = createPostDto.title;
      post.user = user;
      await this.dataSource.manager.save(post);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      await queryRunner.release();
    }
    return {
      message: 'post created',
      post,
    };
  }

  async allPostsWithComments() {
    try {
      const queryBuilder = this.dataSource.manager.createQueryBuilder(
        Post,
        'post',
      );
      const posts = await queryBuilder
        .leftJoinAndSelect('post.comments', 'comments')
        .select(['post.title', 'post.content', 'comments.content'])
        .getRawAndEntities();
      const query = queryBuilder.getQuery();
      console.log(query);

      return {
        message: 'all posts with their associated comments',
        posts,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async countPostOfEachUser() {
    try {
      const queryBuilder = this.dataSource.manager.createQueryBuilder(
        User,
        'user',
      );
      const result = await queryBuilder
        .leftJoinAndSelect('user.posts', 'posts')
        .loadRelationCountAndMap('user.postCount', 'user.posts')
        .getMany();

      return {
        message: 'total number of posts created by each user',
        result,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
