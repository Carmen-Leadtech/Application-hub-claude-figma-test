/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: <T = string>(
    pattern: string,
    options?: {
      query?: string;
      import?: string;
      eager?: boolean;
    }
  ) => Record<string, T | (() => Promise<T>)>;
}
