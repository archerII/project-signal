import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    className?: string;
    variant?: 'responsive' | 'icon' | 'horizontal' | 'stacked';
}

export default function Logo({ className = '', variant = 'responsive' }: LogoProps) {
    const content = (
        <>
            {/* Icon - Visible on Mobile by default in responsive mode */}
            {(variant === 'responsive' || variant === 'icon') && (
                <div className={`relative w-8 h-8 ${variant === 'responsive' ? 'block md:hidden' : ''} ${className}`}>
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
                <div className={`relative w-40 h-8 ${variant === 'responsive' ? 'hidden md:block' : ''} ${className}`}>
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
                <div className={`relative w-32 h-32 ${className}`}>
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
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            {content}
        </Link>
    );
}
