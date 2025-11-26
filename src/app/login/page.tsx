'use client';

import { signIn } from 'next-auth/react';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
            <div className="mb-8 rounded-full bg-zinc-900 p-6">
                <ShieldCheck className="h-12 w-12 text-emerald-500" />
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                Project Signal
            </h1>
            <p className="mb-8 text-zinc-400">
                Restricted Access. Authorized Personnel Only.
            </p>

            <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
            >
                Sign in with Google
            </button>
        </div>
    );
}
