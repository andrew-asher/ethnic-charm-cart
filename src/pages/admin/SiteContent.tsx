import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const SiteContent = () => {
  const { siteContent, updateSiteContent } = useAdmin();
  const [form, setForm] = useState({ ...siteContent });

  const handleSave = () => {
    updateSiteContent(form);
    toast.success('Site content saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Site Content</h1>
        <p className="text-sm text-muted-foreground">Edit global website text and content</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Brand & Tagline</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Tagline</Label><Input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} /></div>
            <div className="space-y-2"><Label>Subtext</Label><Input value={form.subtext} onChange={e => setForm({ ...form, subtext: e.target.value })} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">About Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={form.aboutTitle} onChange={e => setForm({ ...form, aboutTitle: e.target.value })} /></div>
            <div className="space-y-2"><Label>Text</Label><Textarea value={form.aboutText} onChange={e => setForm({ ...form, aboutText: e.target.value })} rows={3} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Delivery & Contact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Delivery Note</Label><Input value={form.deliveryNote} onChange={e => setForm({ ...form, deliveryNote: e.target.value })} /></div>
            <div className="space-y-2"><Label>Pickup Note</Label><Input value={form.pickupNote} onChange={e => setForm({ ...form, pickupNote: e.target.value })} /></div>
            <div className="space-y-2"><Label>Contact Location</Label><Input value={form.contactLocation} onChange={e => setForm({ ...form, contactLocation: e.target.value })} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Social & Footer</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Instagram Link</Label><Input value={form.instagramLink} onChange={e => setForm({ ...form, instagramLink: e.target.value })} /></div>
            <div className="space-y-2"><Label>Footer Text</Label><Input value={form.footerText} onChange={e => setForm({ ...form, footerText: e.target.value })} /></div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save All Content</Button>
    </div>
  );
};

export default SiteContent;
