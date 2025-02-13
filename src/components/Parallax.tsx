const Parallax = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Section 1: Parallax Background */}
      <div
        className="h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/christopher-gower-m_HRfLhgABo-unsplash.jpg')",
        }}>
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-6xl font-bold text-white">
            Welcome to My Portfolio
          </h1>
        </div>
      </div>

      {/* Section 2: Content */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-800 max-w-2xl text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          purus eget nisi tincidunt tincidunt. Sed euismod, nisl nec aliquam
          aliquet, nunc nisl aliquam nunc, nec aliquam nisl nunc nec nisl.
        </p>
      </div>

      {/* Section 3: Parallax Background */}
      <div
        className="h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/darkness.webp')" }}>
        <div className="flex items-center justify-center h-full bg-black/50">
          <h2 className="text-5xl font-bold text-white">Explore More</h2>
        </div>
      </div>

      {/* Section 4: Content */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-800 max-w-2xl text-center">
          Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis
          euismod malesuada. Nulla facilisi. Proin ac nisi nec lorem tincidunt
          tincidunt.
        </p>
      </div>
    </div>
  );
};

export default Parallax;
