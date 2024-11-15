import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * jwt-auth.guardでreq.userにユーザ情報が追加される、JwtStrategyのvalidateの戻り値がuserのオブジェクト.
 * controllerでは@User()デコレーターにてオブジェクト取得可. 例）@User() user: UserInfoDto
 * @User('プロパティ名')でオブジェクト内の特定の項目を取得可. 例）@User('id') id: string
 */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
