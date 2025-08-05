// src/components/LogoCarousel.tsx

export function LogoCarousel() {
  // A list of logos. I've added more for a better scrolling effect.
  const logos = [
    "FORTUNE 500", "3M", "Microsoft", "NVIDIA", "Nasdaq",
    "Google", "Apple", "Amazon", "Meta", "Tesla", "Oracle"
  ];

  return (
    <div className="bg-white py-8">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((logo, index) => (
            <li key={index}>
              <p className="text-xl font-bold text-gray-400 whitespace-nowrap">{logo}</p>
              {/* If using image files, you would use: */}
              {/* <img src={`/logos/${logo}.svg`} alt={logo} /> */}
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
          {logos.map((logo, index) => (
            <li key={index}>
              <p className="text-xl font-bold text-gray-400 whitespace-nowrap">{logo}</p>
              {/* <img src={`/logos/${logo}.svg`} alt={logo} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}