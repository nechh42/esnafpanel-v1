import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from 'lucide-react';

// Add the type definition for PricingPlansProps
type PricingPlansProps = {
  businessData?: any;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ businessData }) => {
  return (
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
          <Button className="w-full" variant="outline">Choose plan</Button>
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
          <Button className="w-full">Choose plan</Button>
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
          <Button className="w-full" variant="outline">Contact us</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPlans;
