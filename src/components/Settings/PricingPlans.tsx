
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Add the type definition for PricingPlansProps
type PricingPlansProps = {
  businessData?: any;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  
  const handlePlanSelection = (planType: string) => {
    toast({
      title: "Ödeme İşlemi",
      description: `${planType} planı için ${paymentMethod === "creditCard" ? "kredi kartı" : "havale"} ile ödeme işlemi başlatılıyor...`,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Ödeme Yöntemi Seçin</h3>
        <RadioGroup 
          defaultValue={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="flex items-center cursor-pointer">
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Kredi Kartı</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="bankTransfer" id="bankTransfer" />
            <Label htmlFor="bankTransfer" className="flex items-center cursor-pointer">
              <Banknote className="h-5 w-5 mr-2" />
              <span>Banka Havalesi</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Start with the essentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-2xl font-bold">
              Free
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Basic reporting
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Up to 5 users
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                5GB storage
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => handlePlanSelection("Basic")}>Choose plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Advanced features for pros.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-2xl font-bold">
              $19/month
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Advanced reporting
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Unlimited users
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                50GB storage
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handlePlanSelection("Pro")}>Choose plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Custom solutions for enterprises.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-2xl font-bold">
              Contact us
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Custom reporting
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Unlimited users
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Unlimited storage
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                24/7 support
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Custom integrations
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => handlePlanSelection("Enterprise")}>Contact us</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingPlans;
