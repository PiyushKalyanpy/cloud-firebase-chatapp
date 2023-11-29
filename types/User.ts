/**
 * Represents a user in the chat app.
 */
export interface UserInterface {
  uid: string;
  name: string;
  email: string;
  hideMe: boolean;
  photoURL: string;
}
