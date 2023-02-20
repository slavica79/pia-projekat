import { Message } from "./message";

export class Chat {
  _id: string;
  organizer: string;
  participant: string;
  messages: Array<Message>;
  studio: string;
  icon: string; // ikonica organizatora
}
