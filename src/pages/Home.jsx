import Header from "../components/Header";
import HeroText from "../components/HeroText";
import GlobalNav from "../components/GlobalNav";
import ApiCarousel from "../components/api/carousel/ApiCarousel";
import publisherGroups from "../data/publisherGroups";
import IntroSection from "../components/IntroSection";
import Cases from "../components/Cases";
import Footer from "../components/Footer";

export default function Home({ categories, apis }) {
  return (
    <>
      <div className="texture-wrapper">
        <GlobalNav categories={categories} apis={apis} />
        <Header categories={categories} apis={apis} />

        <HeroText />
      </div>
      <IntroSection />

      <ApiCarousel
        items={categories.map((c) => ({
          id: c,
          name: c,
          count: apis.filter((a) => publisherGroups[c]?.includes(a.publisher)).length,
        }))}
      />

      <Cases />

      <Footer />
    </>
  );
}
