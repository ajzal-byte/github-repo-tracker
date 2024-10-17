'use client';

import { Button } from './ui/button';
import { Icons } from '@/components/icons';
import { PATHS } from '@/config/paths';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import * as React from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          signIn('github', {
            callbackUrl: PATHS.DASHBOARD,
          });
        }}
        type="button">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
