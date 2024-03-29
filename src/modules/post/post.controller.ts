import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  // retrieve all posts with their associated comments
  @Get('allPostsWithComments')
  allPostsWithComments() {
    return this.postService.allPostsWithComments();
  }

  // total number of posts created by each user
  @Get('countPostOfEachUser')
  countPostOfEachUser() {
    return this.postService.countPostOfEachUser();
  }
}
