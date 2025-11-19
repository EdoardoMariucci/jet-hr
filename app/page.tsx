import CalcCard from "@/components/CalcCard";
import RecapCard from "@/components/RecapCard";
import DetailedCard from "@/components/DetailedCard";
import DialogController from "@/components/DialogController";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-14 pb-20">
      <div className="flex gap-4">
        <CalcCard />
        <RecapCard />
      </div>
      <DetailedCard />
      <DialogController />
    </div>
  );
}
