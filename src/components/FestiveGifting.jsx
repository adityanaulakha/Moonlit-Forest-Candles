import Img1 from '../assets/FestiveGifting/Img_1.webp';
import Img2 from '../assets/FestiveGifting/Img_2.webp';
import Img3 from '../assets/FestiveGifting/Img_3.webp';
import Img4 from '../assets/FestiveGifting/Img_4.webp';

// Product data (replace image URLs with local imports when assets are ready)
const gifting = [
	{ id: 1, title: 'Divine Essence – Ganesh & Laxmi Jar Set', desc: 'Opulent oud & sandal accords in ceremonial jar design.', price: '₹ 2,950', reviews: 6, rating: 5, image: Img1 },
	{ id: 2, title: 'Mini Bowl Candle Gift Set', desc: 'Foiled bowl candle & botanical wax tablet pairing.', price: '₹ 1,499', reviews: 7, rating: 5, image: Img2 },
	{ id: 3, title: 'Jewel Bloom – Flower Candle', desc: 'Amber | Golden Pine fragrance in ornate vessel.', price: '₹ 1,899', reviews: 4, rating: 5, image: Img3 },
	{ id: 4, title: 'Aura Diya Gift Set – Dewy Balsam (8)', desc: 'Eight diya set infused with dewy balsam notes.', price: '₹ 2,499', reviews: 2, rating: 5, image: Img4 }
];

const Stars = ({ count = 5 }) => (
	<div className="flex items-center gap-[2px] text-amber-500 text-[10px] leading-none">
		{Array.from({ length: count }).map((_, i) => (
			<span key={i}>★</span>
		))}
	</div>
);

function FestiveGifting() {
	return (
			<section className="w-full py-12 md:py-14 bg-white" aria-labelledby="festive-gifting-heading">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<header className="mb-8 text-center">
						<h2 id="festive-gifting-heading" className="tracking-[0.35em] text-2xl sm:text-3xl font-semibold text-neutral-700 mb-3">FESTIVE GIFTING</h2>
					<div className="flex justify-center">
						<span className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />
					</div>
				</header>
					<div className="grid gap-8 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{gifting.map(p => (
								<article key={p.id} className="group flex flex-col h-full" aria-label={p.title}>
								<div className="relative mb-3 overflow-hidden bg-neutral-100 aspect-[4/5] rounded-sm">
										<img
											src={p.image}
											alt={p.title}
											className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
										/>
									</div>
									<div className="flex flex-col flex-grow">
									<h3 className="text-[13px] leading-snug font-medium text-neutral-900 tracking-wide uppercase line-clamp-3 min-h-[2.6rem]">
											{p.title}
										</h3>
									<p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-3 min-h-[3.2rem]">
											{p.desc}
										</p>
									{/* <div className="flex items-center gap-1.5 text-[9.5px] tracking-wide min-h-[1rem]">
											<Stars count={p.rating} />
											<span className="text-neutral-500 font-medium">{p.reviews} REVIEWS</span>
										</div> */}
									<div className="mt-auto">
										<div className="text-[13px] font-semibold tracking-wide text-neutral-800">{p.price}</div>
										<button className="mt-3 inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-[11px] font-medium tracking-wide text-neutral-700 hover:bg-neutral-900 hover:text-white transition w-full">
												Add to Cart
											</button>
										</div>
									</div>
								</article>
							))}
					</div>
			</div>
		</section>
	);
}

export default FestiveGifting;