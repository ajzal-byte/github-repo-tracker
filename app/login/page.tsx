import { SiteHeader } from '@/components/site-header';
import { UserAuthForm } from '@/components/user-auth-form';
import { authOptions } from '@/lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account to access your dashboard',
};

export default async function AuthenticationPage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  console.log('SESSION FROM DASHBOARD: ', session);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <SiteHeader />
      <div className="container relative flex h-[91vh] flex-col items-center justify-center font-display md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-indigo-800 dark:bg-slate-800" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="block items-center justify-center self-center md:flex lg:hidden">
              <Image src="/icon.png" alt="logo" width={48} height={48} />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login with GitHub
              </h1>
            </div>
            <UserAuthForm />
          </div>
          <p className="py-3 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </>
  );
}
