import badges from '../assets/HeroSection/Banner_1.jpg';

function WhyChooseUs() {
  return (
    <section className="w-full py-16 md:py-20 bg-white" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h2
            id="why-choose-us-heading"
            className="tracking-[0.35em] text-3xl font-semibold text-neutral-700 mb-4"
          >
            WHY CHOOSE US
          </h2>
          <div className="flex justify-center">
            <span className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent" />
          </div>
        </header>
        <div
          className="relative w-full overflow-hidden rounded-sm"
          role="img"
          aria-label="Brand quality assurance visual"
          style={{
            backgroundImage: `url(${badges})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Aspect ratio container */}
            <div className="w-full pt-[75%] sm:pt-[58%] md:pt-[45%] lg:pt-[36%] xl:pt-[32%]" />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;