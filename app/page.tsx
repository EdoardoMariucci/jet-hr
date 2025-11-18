import CalcCard from "@/components/CalcCard";
import RecapCard from "@/components/RecapCard";
import DetailedCard from "@/components/DetailedCard";
import { InfoDock } from "@/components/Dock";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-14 pb-28">
      <div className="flex gap-4">
        <CalcCard />
        <RecapCard />
      </div>
      <DetailedCard />
      <InfoDock />
    </div>
  );
}
