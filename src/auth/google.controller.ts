import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleOauthGuard } from './google.guard';

@Controller('auth/google')
export class GoogleOauthController {
  @Get('/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }
}
