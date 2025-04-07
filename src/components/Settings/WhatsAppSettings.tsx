
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from 'lucide-react';

type WhatsAppSettingsProps = {
  businessData?: any;
}

const WhatsAppSettings: React.FC<WhatsAppSettingsProps> = ({ businessData }) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <CardTitle>WhatsApp İşletme API</CardTitle>
          </div>
          <CardDescription>
            WhatsApp üzerinden müşterilerinizle iletişime geçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              WhatsApp Business API bağlantısı için gerekli bilgileri girin
            </p>
            <div>
              <Label htmlFor="whatsapp-number">İşletme Telefon Numarası</Label>
              <Input id="whatsapp-number" placeholder="Örn: +905xxxxxxxxx" />
            </div>
            <Button>WhatsApp Hesabına Bağlan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSettings;
