import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('create')
  async createUser(@Body('channel') channel: string): Promise<void> {
    // Logic to create user
    // ...

    // Send welcome message
    await this.messagingService.sendWelcomeMessage(channel);
  }

  @Get('conversation')
  async getConversationMessages(
    @Query('channel') channel: string,
  ): Promise<any[]> {
    return this.messagingService.getConversationMessages(channel);
  }
}
