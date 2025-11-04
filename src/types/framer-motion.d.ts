declare module 'framer-motion' {
  // Minimal shim for framer-motion to avoid conflicts during migration.
  // This treats motion and related types as any. Replace with proper types later.
  export const motion: any;
  export const AnimatePresence: React.ComponentType<{
    children?: React.ReactNode;
    initial?: boolean;
    mode?: "sync" | "wait" | "popLayout";
    onExitComplete?: () => void;
  }>;
  export type HTMLMotionProps<T extends keyof JSX.IntrinsicElements> = any;
  export type SVGMotionProps<T> = any;
  export default motion;
}
