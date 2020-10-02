import { RadioChangeEvent } from 'antd/lib/radio';

export type InputEventType<T = HTMLInputElement> =
  | ((event: React.ChangeEvent<T>) => void)
  | undefined;

export type RadioInputEventType =
  | ((event: RadioChangeEvent) => void)
  | undefined;
