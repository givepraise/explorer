"use client";

import { Community } from "../interfaces/community.interface";

export type CommunityCardProps = {
  community: Community;
  children: React.ReactNode;
};

export default function CommunityCard({
  community,
  children,
}: CommunityCardProps) {
  return (
    <div
      key={community._id.toString()}
      className="inline-block p-8 text-base font-normal prose transition duration-200 ease-in-out rounded-lg cursor-pointer bg-slate-100 hover:-translate-y-1 hover:scale-105 "
      onClick={() => {
        window.location.href = `https://${community.hostname}`;
      }}
    >
      {children}
    </div>
  );
}
