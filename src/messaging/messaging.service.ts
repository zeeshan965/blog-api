import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';

@Injectable()
export class MessagingService {
  private client: WebClient;

  constructor(private configService: ConfigService) {
    this.client = new WebClient(this.configService.get('slack_bot_token'));
  }

  async sendWelcomeMessage(channel: string): Promise<void> {
    const text = 'Welcome to our Slack workspace!';

    await this.client.chat.postMessage({ channel, text });
  }

  async getConversationMessages(channel: string): Promise<any[]> {
    const result = await this.client.conversations.history({ channel });
    return result.messages;
  }
}
