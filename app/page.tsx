import CalcCard from "@/components/CalcCard";
import RecapCard from "@/components/RecapCard";
import DetailedCard from "@/components/DetailedCard";
import DialogController from "@/components/DialogController";
import Logo from "@/components/Logo";
import TaxChart from "@/components/TaxChart";
import NetChart from "@/components/NetChart";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-14 pb-20">
      <Logo />
      <div className="flex flex-col gap-4 pt-10">
        <div className="flex flex-wrap gap-4 justify-center">
          <CalcCard />
          <RecapCard />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <TaxChart />
          <NetChart />
        </div>
      </div>
      <DetailedCard />
      <DialogController />
    </div>
  );
}
