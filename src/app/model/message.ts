export class Message{
  id: number | undefined;

  authorId: number | undefined;
  authorName: string | undefined;
  content: string;
  sendDate: Date;

  channelId : number | undefined;
  receiverId: number | undefined;

  respondsToId: number | undefined;

  constructor(authorId: number | undefined, authorName: string | undefined, content: string, channelId: number | undefined, receiverId: number | undefined, respondsToId: number | undefined) {
    this.id = undefined;
    this.authorId = authorId;
    this.authorName = authorName;
    this.content = content;
    this.sendDate = new Date();
    this.channelId = channelId;
    this.receiverId = receiverId;
    this.respondsToId = respondsToId;
  }
}
