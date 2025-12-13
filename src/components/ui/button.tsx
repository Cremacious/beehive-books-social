import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 hover:transform hover:-translate-y-0.5 active:transform active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-md hover:shadow-lg',
        beeYellow:
          ' bg-yellow-500 hover:bg-yellow-600 text-slate-800 rounded-lg font-bold transition-colors hover:cursor-pointer border-b-2 border-yellow-700 shadow-lg',
        beeDark:
          'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg font-bold transition-colors hover:cursor-pointer border-b-2 border-[#1a1a1a] shadow-lg',
        beeSuccess:
          ' bg-green-500 hover:bg-green-600 text-slate-800 rounded-lg font-bold transition-colors hover:cursor-pointer border-b-2 border-green-700 shadow-lg',
        destructive:
          'bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90 shadow-md hover:shadow-lg border-b-2 border-red-700',
        outline:
          'border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] shadow-sm hover:shadow-md backdrop-blur-sm',
        secondary:
          'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80 shadow-sm hover:shadow-md',
        ghost:
          'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] hover:shadow-sm',
        link: 'text-[var(--primary)] underline-offset-4 hover:underline hover:no-transform',
        honey:
          'bg-[var(--honey-yellow)] text-[var(--dark-slate)] hover:bg-[var(--amber)] shadow-md hover:shadow-lg font-semibold',
      },
      size: {
        default: 'h-10 px-6 py-2 has-[>svg]:px-4',
        sm: 'h-8 rounded-md gap-1.5 px-4 text-xs has-[>svg]:px-3',
        lg: 'h-12 rounded-xl px-8 text-base has-[>svg]:px-6 font-bold',
        icon: 'size-10 rounded-lg',
        'icon-sm': 'size-8 rounded-md',
        'icon-lg': 'size-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
