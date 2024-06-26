import { randomUUID } from 'node:crypto';

import { Replace } from '@/helpers/Replace';

import { Content } from './value-objects/content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceldAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category;
  }

  public get category(): string {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public unread() {
    this.props.readAt = null;
  }

  public cancel() {
    this.props.canceldAt = new Date();
  }
  public get canceledAt(): Date | null | undefined {
    return this.props.canceldAt;
  }

  public get creatdAt(): Date {
    return this.props.createdAt;
  }
}
