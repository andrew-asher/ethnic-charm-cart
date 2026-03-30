import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Image } from 'lucide-react';
import { toast } from 'sonner';

const Homepage = () => {
  const { heroSettings, updateHeroSettings } = useAdmin();
  const [form, setForm] = useState({ ...heroSettings });

  const handleSave = () => {
    updateHeroSettings(form);
    toast.success('Hero settings saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Homepage</h1>
        <p className="text-sm text-muted-foreground">Manage hero banner and homepage content</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Hero Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Background Image URL</Label>
            <Input value={form.backgroundImage} onChange={e => setForm({ ...form, backgroundImage: e.target.value })} placeholder="Hero background image URL" />
            {form.backgroundImage && (
              <div className="w-full h-40 rounded-lg overflow-hidden bg-muted">
                <img src={form.backgroundImage} alt="Hero preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary CTA Text</Label>
              <Input value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Secondary CTA Text</Label>
              <Input value={form.secondaryCtaText} onChange={e => setForm({ ...form, secondaryCtaText: e.target.value })} />
            </div>
          </div>
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Homepage;
