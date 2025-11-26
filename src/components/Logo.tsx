import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    variant?: 'responsive' | 'icon' | 'horizontal' | 'stacked';
}

export default function Logo({ className = '', variant = 'responsive' }: LogoProps) {
    const content = (
        <>
            {/* Icon - Visible on Mobile by default in responsive mode */}
            {(variant === 'responsive' || variant === 'icon') && (
                <div className={cn(
                    "relative w-10 h-10",
                    variant === 'responsive' ? 'block md:hidden' : '',
                    className
                )}>
                    <Image
                        src="/logo-icon.png"
                        alt="Project Signal"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}

            {/* Horizontal - Visible on Desktop by default in responsive mode */}
            {(variant === 'responsive' || variant === 'horizontal') && (
                <div className={cn(
                    "relative w-48 h-12",
                    variant === 'responsive' ? 'hidden md:block' : '',
                    className
                )}>
                    <Image
                        src="/logo-horizontal.png"
                        alt="Project Signal"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}

            {/* Stacked - Explicit use only */}
            {variant === 'stacked' && (
                <div className={cn(
                    "relative w-48 h-48",
                    className
                )}>
                    <Image
                        src="/logo-stacked.png"
                        alt="Project Signal"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            )}
        </>
    );

    return (
        <Link href="/" className="inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            {content}
        </Link>
    );
}
