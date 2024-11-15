import { Controller, Get, HttpStatus, Req } from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInfoService } from './user-info.service';
import { Public } from '@/common/decorators/public.decorator';
import { UserInfoResponseDto } from '@/resources/dtos/user-info/user-info-response.dto';

@Controller('user-info')
@ApiTags('/user-info')
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  // GET user-info API
  @Public()
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: UserInfoResponseDto })
  public async findAll(@Req() req): Promise<UserInfoResponseDto> {
    return await this.userInfoService.findOne(req.user);
  }
}
