import CommunityGrid from "./components/community-grid";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="w-full p-5 prose text-gray-800 max-w-7xl">
          <div className="grid grid-cols-3 gap-6">
            <CommunityGrid />
          </div>
        </div>
      </div>
    </main>
  );
}

//export const revalidate = 60 * 60; // 1 hour
