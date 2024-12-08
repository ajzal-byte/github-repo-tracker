import { SiteHeader } from '@/components/site-header';
import { UserAuthForm } from '@/components/user-auth-form';
import { authOptions } from '@/lib/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account to access your dashboard',
};

export default async function AuthenticationPage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <SiteHeader />
      <div className="container flex items-center justify-center h-full mt-24">
        <div className="relative flex flex-col items-center justify-center p-8 border border-muted rounded-lg shadow-xl bg-white">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
