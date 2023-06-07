import CommunityGrid from "./components/community-grid";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center ">
        <div className="prose prose-base md:prose-xl">
          <h1 className="text-center py-28">Communities using Praise</h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full p-5 prose text-gray-800 prose-base max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:grid-cols-2">
            <CommunityGrid />
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60 * 60; // 1 hour
