'use client'

import ControlCard from "@/components/ControlCard";
import DataCard from "@/components/DataCard";
import Navbar from "@/components/Navbar"
import { useSuiClient } from "@mysten/dapp-kit";

export default function Home() {
  const client = useSuiClient();
  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-around">
        <ControlCard></ControlCard>
        <DataCard client={client}></DataCard>
      </main>
    </div>
  );
}
