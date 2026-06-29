'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AnimatedGridBackground } from '@/components/ui/animated-grid-background';
import { cn } from '@/lib/utils';

interface AestheticLayoutProps {
	children: React.ReactNode;
	/** Sets the max width of the content area container (e.g., 'max-w-md' for forms, 'max-w-2xl' for pricing grids) */
	maxWidthClassName?: 'max-w-md' | 'max-w-2xl' | 'max-w-xl' | string;
	className?: string;
	showBackButton?: boolean;
	showBackground?: boolean;
}

export function AestheticLayout({
	children,
	maxWidthClassName = 'max-w-md',
	className,
	showBackButton = true,
	showBackground = true,
}: AestheticLayoutProps) {
	const content = (
		<section className="relative flex min-h-screen items-center py-16">
			<div
				className={cn(
					'mx-auto w-full px-6 z-10 space-y-6',
					maxWidthClassName
				)}
			>
				{showBackButton && (
					<div>
						<button
							onClick={() => window.history.back()}
							type="button"
							className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-white px-3 py-1 text-sm font-medium text-foreground shadow-sm transition hover:border-border/70 cursor-pointer"
						>
							<ArrowLeft className="h-4 w-4" />
							Volver
						</button>
					</div>
				)}

				<div className={className}>{children}</div>
			</div>
		</section>
	);

	return (
		<main className="min-h-screen bg-background text-foreground">
			{showBackground ? <AnimatedGridBackground className="min-h-screen">{content}</AnimatedGridBackground> : content}
		</main>
	);
}