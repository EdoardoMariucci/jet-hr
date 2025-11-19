import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CalculateButton from "./Button";

const CalcCard = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Calcola il tuo Netto</CardTitle>
        <CardDescription>
          Inserisci il tuo RAL e scopri quanto ti spetta di netto! 💰
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="ral">RAL</Label>
              <Input
                id="ral"
                type="text"
                placeholder="Inserisci RAL"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CalculateButton variant="default" size="default" />
      </CardFooter>
    </Card>
  );
};

export default CalcCard;
