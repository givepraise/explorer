import Communities from "./communities";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl p-5 prose">
          <div className="grid grid-cols-3 gap-5">
            <Communities />
            <Communities />
            <Communities />
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 60 * 60; // 1 hour
