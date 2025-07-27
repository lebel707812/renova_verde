declare module 'class-variance-authority' {
  export function cva(
    base: string,
    config?: {
      variants?: {
        [key: string]: {
          [key: string]: string;
        };
      };
      defaultVariants?: {
        [key: string]: string;
      };
    }
  ): (props?: Record<string, any>) => string;

  export type VariantProps<T> = any;
}