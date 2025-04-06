
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Globe } from 'lucide-react';

const LanguageSettings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('tr');
  const [dateFormat, setDateFormat] = useState('dd/MM/yyyy');
  const [timeFormat, setTimeFormat] = useState('24h');
  
  const languages = [
    { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
    { id: 'ru', name: 'Русский', flag: '🇷🇺' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];
  
  const dateFormats = [
    { id: 'dd/MM/yyyy', example: '31/12/2023' },
    { id: 'MM/dd/yyyy', example: '12/31/2023' },
    { id: 'yyyy-MM-dd', example: '2023-12-31' },
  ];

  // Load saved language settings on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    const savedDateFormat = localStorage.getItem('dateFormat');
    const savedTimeFormat = localStorage.getItem('timeFormat');
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedDateFormat) setDateFormat(savedDateFormat);
    if (savedTimeFormat) setTimeFormat(savedTimeFormat);
  }, []);

  const handleSave = () => {
    // Save language settings to localStorage
    localStorage.setItem('appLanguage', language);
    localStorage.setItem('dateFormat', dateFormat);
    localStorage.setItem('timeFormat', timeFormat);
    
    // Dispatch custom event to notify app of language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language, dateFormat, timeFormat } 
    }));
    
    toast({
      title: language === 'tr' ? "Dil ayarları güncellendi" : "Language settings updated",
      description: language === 'tr' ? "Dil tercihleriniz başarıyla kaydedildi." : "Your language preferences have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'tr' ? 'Dil ve Bölge Ayarları' : 'Language and Region Settings'}</CardTitle>
          <CardDescription>
            {language === 'tr' ? 'Uygulama dilini ve bölgesel biçimlendirme tercihlerinizi seçin' : 'Choose your application language and regional formatting preferences'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{language === 'tr' ? 'Uygulama Dili' : 'Application Language'}</h3>
            <RadioGroup value={language} onValueChange={setLanguage} className="space-y-3">
              {languages.map(lang => (
                <div key={lang.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.id} id={`lang-${lang.id}`} />
                  <Label htmlFor={`lang-${lang.id}`} className="flex items-center">
                    <span className="mr-2 text-lg">{lang.flag}</span>
                    {lang.name}
                    {lang.id === 'tr' && <span className="ml-2 text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                      {language === 'tr' ? 'Varsayılan' : 'Default'}
                    </span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">{language === 'tr' ? 'Tarih ve Saat Formatı' : 'Date and Time Format'}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">{language === 'tr' ? 'Tarih Formatı' : 'Date Format'}</h4>
                <RadioGroup value={dateFormat} onValueChange={setDateFormat} className="space-y-3">
                  {dateFormats.map(format => (
                    <div key={format.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={format.id} id={`date-${format.id}`} />
                      <Label htmlFor={`date-${format.id}`} className="flex items-center">
                        {format.id} <span className="ml-2 text-sm text-muted-foreground">
                          {language === 'tr' ? 'Örnek:' : 'Example:'} {format.example}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">{language === 'tr' ? 'Saat Formatı' : 'Time Format'}</h4>
                <RadioGroup value={timeFormat} onValueChange={setTimeFormat} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24h" id="time-24h" />
                    <Label htmlFor="time-24h" className="flex items-center">
                      {language === 'tr' ? '24 saat' : '24 hour'} <span className="ml-2 text-sm text-muted-foreground">
                        {language === 'tr' ? 'Örnek:' : 'Example:'} 14:30
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12h" id="time-12h" />
                    <Label htmlFor="time-12h" className="flex items-center">
                      {language === 'tr' ? '12 saat' : '12 hour'} <span className="ml-2 text-sm text-muted-foreground">
                        {language === 'tr' ? 'Örnek:' : 'Example:'} 02:30 PM
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
            <Globe className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">
                {language === 'tr' ? 'Çevirilerimiz hakkında' : 'About our translations'}
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'tr' 
                  ? 'EsnafPanel, Türkçe dilinde en iyi deneyimi sunar. Diğer dillerde eksik çeviriler olabilir. Çeviri hatalarını bildirerek sistemimizin gelişmesine yardımcı olabilirsiniz.'
                  : 'EsnafPanel provides the best experience in Turkish. There may be missing translations in other languages. You can help improve our system by reporting translation errors.'}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>{language === 'tr' ? 'Ayarları Kaydet' : 'Save Settings'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LanguageSettings;
