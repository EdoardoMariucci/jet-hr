import CalcCard from "@/components/CalcCard";
import RecapCard from "@/components/RecapCard";
import DetailedCard from "@/components/DetailedCard";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <CalcCard />
      <RecapCard />
      <DetailedCard />
    </div>
  );
}
