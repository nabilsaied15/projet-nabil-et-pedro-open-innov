export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white shadow flex items-center justify-between px-10 py-4 border-b border-gray-100">
      <div className="flex items-center gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <input type="text" placeholder="Search..." className="bg-gray-100 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-accent text-2xl">🔔</button>
        <button className="text-gray-400 hover:text-accent text-2xl">❓</button>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">👤</div>
      </div>
    </header>
  );
} 