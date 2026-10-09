export type FormChangeHandler<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void;
