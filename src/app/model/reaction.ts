export class Reaction{
  emoji!: string;
  userId!: number;
  messageId!: number;

  constructor(emoji: string, userId: number, messageId: number) {
    this.emoji = emoji;
    this.userId = userId;
    this.messageId = messageId;
  }
}
