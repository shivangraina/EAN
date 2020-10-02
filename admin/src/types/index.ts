export type InputEventType =
  | ((event: React.ChangeEvent<HTMLInputElement>) => void)
  | undefined;
