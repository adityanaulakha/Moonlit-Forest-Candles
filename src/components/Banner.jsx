// Import your actual image once added to assets (replace 'Sundance.jpg')
// import bannerImg from '../assets/Sundance.jpg';

// For now user will provide the actual image; using inline style with a placeholder path
import React from 'react';
import bannerImg from '../assets/Banner.jpg';
import bannerMob from '../assets/Banner_Mobile.jpg';

function Banner() {
	return (
		<>
			{/* Mobile Banner */}
			<section
				className="relative w-full overflow-hidden md:hidden"
				aria-hidden="true"
				role="img"
				aria-label="Promotional banner mobile"
				style={{
					backgroundImage: `url(${bannerMob})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				}}
			>
				<div className="w-full h-[55vh] sm:h-[60vh]" />
				<div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10">
					<a
						href="#shop"
						className="pointer-events-auto inline-flex items-center justify-center bg-white/90 backdrop-blur px-8 py-3 text-[11px] tracking-[0.25em] font-medium text-neutral-900 rounded-sm shadow-sm hover:bg-white transition border border-neutral-200"
					>
						SHOP NOW
					</a>
				</div>
			</section>

			{/* Desktop / Tablet Banner */}
			<section
				className="relative hidden md:block w-full overflow-hidden"
				aria-hidden="true"
				role="img"
				aria-label="Promotional banner desktop"
				style={{
					backgroundImage: `url(${bannerImg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				}}
			>
				<div className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh]" />
				<div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12 lg:pb-14">
					<a
						href="#shop"
						className="pointer-events-auto inline-flex items-center justify-center bg-white/90 backdrop-blur px-10 py-3 text-[11px] tracking-[0.25em] font-medium text-neutral-900 rounded-sm shadow-sm hover:bg-white transition border border-neutral-200"
					>
						SHOP NOW
					</a>
				</div>
			</section>
		</>
	);
}

export default Banner;
