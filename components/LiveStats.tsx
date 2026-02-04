import React from 'react';

const LiveStats: React.FC = () => {
  return (
    <section id="impact" className="pt-20 pb-20 bg-slate-50">
      <div className="container mx-auto px-4">

        {/* Live Feed Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-12 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="text-red-500 font-bold tracking-wider uppercase text-sm">Transparency Board</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2 text-slate-900 flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                Recent Rescues
              </h3>
              <p className="text-slate-500 mt-2 max-w-xl text-sm md:text-base">
                We upload before/after treatment photos for every single case in real-time. This ensures complete transparency for our donors and supporters.
              </p>
            </div>
            <a
              href="https://api-alwayscare.arham.org/api/cases/today/summary"
              target="_blank"
              rel="noreferrer"
              className="text-red-600 font-semibold hover:text-red-700 hover:underline flex items-center gap-1 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
            >
              View Raw Data API &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video bg-slate-200">
                <img
                  src={`https://picsum.photos/600/400?random=${i + 10}`}
                  alt={`Rescue case ${2048 + i} - Animal receiving treatment`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 md:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold mb-2 inline-block">CRITICAL</span>
                    <p className="text-white text-base md:text-lg font-bold">Case #{2048 + i}</p>
                    <p className="text-slate-300 text-xs md:text-sm mt-1">Treating severe fracture • Ahmedabad • 2 mins ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
