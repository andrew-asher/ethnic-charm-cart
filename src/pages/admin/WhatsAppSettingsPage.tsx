import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const WhatsAppSettingsPage = () => {
  const { whatsAppSettings, updateWhatsAppSettings } = useAdmin();
  const [form, setForm] = useState({ ...whatsAppSettings });

  const handleSave = () => {
    updateWhatsAppSettings(form);
    toast.success('WhatsApp settings saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">WhatsApp Settings</h1>
        <p className="text-sm text-muted-foreground">Configure WhatsApp ordering experience</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" />Contact & Message</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>WhatsApp Phone Number (with country code, no +)</Label>
            <Input value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} placeholder="447000000000" />
          </div>
          <div className="space-y-2">
            <Label>Default Message Template</Label>
            <Textarea value={form.messageTemplate} onChange={e => setForm({ ...form, messageTemplate: e.target.value })} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Delivery / Pickup Note</Label>
            <Input value={form.deliveryNote} onChange={e => setForm({ ...form, deliveryNote: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Visibility Controls</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: 'showOnProductCards' as const, label: 'Show on product cards' },
            { key: 'showOnProductDetail' as const, label: 'Show on product detail page' },
            { key: 'showOnCart' as const, label: 'Show on cart page' },
            { key: 'showFloatingButton' as const, label: 'Show floating WhatsApp button' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label>{item.label}</Label>
              <Switch checked={form[item.key]} onCheckedChange={v => setForm({ ...form, [item.key]: v })} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Settings</Button>
    </div>
  );
};

export default WhatsAppSettingsPage;
