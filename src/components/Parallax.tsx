import { useState, useEffect } from "react";

const Parallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[200vh] overflow-hidden">
      {/* Background Layer - moves slowest */}
      <div
        className="fixed inset-0 bg-darkGold z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: "url(/philipp-dusel--Mbfhs0u4YQ-unsplash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Midground Layer - medium speed */}
      <div
        className="fixed inset-0 z-10"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundImage: "url(/moritz-lange-_x_y-csW60s-unsplash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* /egor-litvinov-rFUWuxeJqeM-unsplash.jpg */}
      {/* Foreground Layer - moves faster */}
      <div
        className="fixed inset-0 z-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: "url(/philipp-dusel--Mbfhs0u4YQ-unsplash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content Section */}
      <div className="relative z-30 pt-[100vh] px-4">
        <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Parallax Effect</h1>
          <p className="text-gray-700 mb-4">
            Scroll ke bawah untuk melihat efek parallax...
          </p>
          {/* Tambahkan lebih banyak konten di sini */}
          <div className="h-screen"></div>
          <p className="text-gray-700">
            Lanjutan konten dengan efek parallax...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
