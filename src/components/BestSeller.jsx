import Img1 from '../assets/BestSeller/Img_1.webp';
import Img2 from '../assets/BestSeller/Img_2.webp';
import Img3 from '../assets/BestSeller/Img_3.webp';
import Img4 from '../assets/BestSeller/Img_4.webp';

// Placeholder product data (replace image paths with actual assets if available)
const products = [
	{
		id: 1,
		badge: 'Limited Edition',
		title: 'Whispering Jasmine – Wax Tablets (Set of 2)',
		desc: 'Hand-poured botanical aroma tablets infused with soft jasmine notes.',
		price: '₹ 995',
		image: Img1
	},
	{
		id: 2,
		badge: 'Bestseller',
		title: 'Divine Essence – Ganesh & Laxmi Jar Set',
		desc: 'Opulent oud & sandal fusion presented with intricate deity lids.',
		price: '₹ 2,950',
		image: Img2
	},
	{
		id: 3,
		badge: 'Heritage',
		title: 'Heritage Heirloom – Footed Silver Candle (S)',
		desc: 'Vintage inspired vessel with clean, whispering jasmine burn.',
		price: '₹ 1,099',
		image: Img3
	},
	{
		id: 4,
		badge: 'Gift Set',
		title: 'Scented Memories – Rose Mini Bowl Gift Set',
		desc: 'Curated keepsake blend with floral wax tablets & mini bowl candle.',
		price: '₹ 1,999',
		image: Img4
	}
];

function BestSeller() {
	return (
		<section className="w-full py-16 md:py-20 bg-white" aria-labelledby="bestsellers-heading">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<header className="mb-12 text-center">
					<h2 id="bestsellers-heading" className="tracking-[0.35em] text-3xl font-semibold text-neutral-700 mb-4">BESTSELLERS</h2>
					<div className="flex justify-center">
						<span className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />
					</div>
				</header>
				<div className="grid gap-10 sm:gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-4">
					{products.map(p => (
						<article key={p.id} className="group flex flex-col" aria-label={p.title}>
							<div className="relative mb-5 overflow-hidden bg-neutral-100 aspect-[4/5] rounded-sm">
								<img
									src={p.image}
									alt={p.title}
									className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									loading="lazy"
								/>
								{p.badge && (
									<span className="absolute left-0 top-3 px-3 py-1 text-[10px] tracking-wide font-medium uppercase bg-neutral-800/85 text-white backdrop-blur-sm">
										{p.badge}
									</span>
								)}
							</div>
							<h3 className="text-[13px] leading-snug font-medium text-neutral-900 tracking-wide uppercase">
								{p.title}
							</h3>
							<p className="mt-2 text-[11px] text-neutral-500 leading-relaxed line-clamp-3">
								{p.desc}
							</p>
							<div className="mt-4 text-sm font-semibold tracking-wide text-neutral-800">{p.price}</div>
							<button className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2 text-xs font-medium tracking-wide text-neutral-700 hover:bg-neutral-900 hover:text-white transition">
								Add to Cart
							</button>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

export default BestSeller;
