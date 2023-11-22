export enum TypeMessage {
  Warning = 'warning',
  Danger = 'danger',
  Success = 'success',
};

export interface FloatMessage {
  type: TypeMessage,
  title: string, // Incorrect password
  content: string, // reasons
};
