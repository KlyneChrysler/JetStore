import CategoryItem from "../components/CategoryItem";
import waveBackground from "../assets/sign_in_wave.png";

const categories = [
  {
    href: "/bouquets",
    name: "Bouquets",
    imageUrl: "/bouquets.avif",
  },
  {
    href: "/roses",
    name: "Roses",
    imageUrl: "/roses.avif",
  },
  {
    href: "/seasonal",
    name: "Seasonal",
    imageUrl: "/seasonal-flowers.avif",
  },
  {
    href: "/events",
    name: "Events",
    imageUrl: "/weddings&events.avif",
  },
  { href: "/plants", name: "Plants", imageUrl: "/plants.avif" },
  { href: "/luxury", name: "Luxury", imageUrl: "/luxury.avif" },
  { href: "/sympathy", name: "Sympathy", imageUrl: "/sympathy.avif" },
  {
    href: "/celebrations",
    name: "Celebrations",
    imageUrl: "/celebrations.avif",
  },
];

const HomePage = () => {
  return (
    <div
      className="relative min-h-screen text-white overflow-hidden bg-cover bg-[rgba(250,245,235,1)]"
      style={{ backgroundImage: `url(${waveBackground})` }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <h1
          className="text-center text-5xl sm:text-7xl text-yellow-900 mb-4 mt-10"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          Welcome Florist
        </h1>
        <p
          className="text-center text-xl text-yellow-900 mb-12"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          Feel free to give love  
        </p> */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
