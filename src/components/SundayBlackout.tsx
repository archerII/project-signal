import { Coffee } from 'lucide-react';

export function SundayBlackout() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
            <div className="mb-6 rounded-full bg-zinc-900 p-6">
                <Coffee className="h-12 w-12 text-zinc-400" />
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                It's Sunday.
            </h1>
            <p className="max-w-md text-lg text-zinc-400">
                No AI news. No hype. No tutorials.
                <br />
                Take a break. We'll be back tomorrow.
            </p>
        </div>
    );
}
