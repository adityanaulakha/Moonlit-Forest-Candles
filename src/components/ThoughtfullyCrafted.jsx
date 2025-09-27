import Img1 from '../assets/ThoughtfullyCrafted/Img_1.webp';
import Img2 from '../assets/ThoughtfullyCrafted/Img_2.webp';

// NOTE: Replace these placeholder image URLs with local assets (e.g., import img1 from '../assets/...')
const FEATURES = [
  {
    id: 'soy',
    title: 'PLANT BASED SOY WAX',
    image: Img1,
    alt: 'Natural soy wax blocks beside an ivory pillar candle',
    description:
      'All our candles are hand-crafted in small batches with 100% natural soy wax and authentic fragrances for candles that burn beautifully and fill your space with clean, natural scents.'
  },
  {
    id: 'jars',
    title: 'REPURPOSABLE JARS',
    image: Img2,
    alt: 'Amber glass jars repurposed as brush and floral holders',
    description:
      'By offering the highest quality using the best ingredients our candles are made to become part of your home by up-cycling our classic jars. They can be repurposed into vases, makeup brush holders & planters.'
  }
];

function ThoughtfullyCrafted() {
  return (
    <section className="w-full py-20 md:py-24 bg-white" aria-labelledby="crafted-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <h2
            id="crafted-heading"
            className="tracking-[0.35em] text-3xl nt-semibold text-neutral-800 mb-5"
          >
            THOUGHTFULLY CRAFTED
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
            Illuminate your home guilt-free with candles that are as kind to the planet as they are beautiful.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />
          </div>
        </header>

        <div className="grid gap-14 md:gap-10 md:grid-cols-2">
          {FEATURES.map(f => (
            <article key={f.id} className="flex flex-col items-center text-center" aria-labelledby={`feature-${f.id}`}>              
              <div className="w-full relative overflow-hidden bg-neutral-100 aspect-[4/3] md:aspect-[3/2] mb-8">
                <img
                  src={f.image}
                  alt={f.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out will-change-transform hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3
                id={`feature-${f.id}`}
                className="tracking-[0.25em] text-[11px] sm:text-xs font-medium text-neutral-800 mb-5"
              >
                {f.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] leading-relaxed text-neutral-600 max-w-md">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThoughtfullyCrafted;