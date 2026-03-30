import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { HeroSlide } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Plus, Trash2, Eye, EyeOff, GripVertical, Image } from 'lucide-react';
import { toast } from 'sonner';

const Homepage = () => {
  const { heroSettings, updateHeroSettings } = useAdmin();
  const [form, setForm] = useState({ ...heroSettings });
  const [newSlideUrl, setNewSlideUrl] = useState('');

  const handleSave = () => {
    updateHeroSettings(form);
    toast.success('Hero settings saved!');
  };

  const addSlide = () => {
    if (!newSlideUrl.trim()) return;
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      imageUrl: newSlideUrl.trim(),
      order: (form.slides?.length || 0) + 1,
      visible: true,
    };
    setForm({ ...form, slides: [...(form.slides || []), newSlide] });
    setNewSlideUrl('');
    toast.success('Slide added! Remember to save.');
  };

  const removeSlide = (id: string) => {
    setForm({ ...form, slides: (form.slides || []).filter(s => s.id !== id) });
    toast.info('Slide removed. Remember to save.');
  };

  const toggleSlideVisibility = (id: string) => {
    setForm({
      ...form,
      slides: (form.slides || []).map(s => s.id === id ? { ...s, visible: !s.visible } : s),
    });
  };

  const updateSlideUrl = (id: string, url: string) => {
    setForm({
      ...form,
      slides: (form.slides || []).map(s => s.id === id ? { ...s, imageUrl: url } : s),
    });
  };

  const moveSlide = (id: string, direction: 'up' | 'down') => {
    const slides = [...(form.slides || [])];
    const idx = slides.findIndex(s => s.id === id);
    if (direction === 'up' && idx > 0) {
      [slides[idx], slides[idx - 1]] = [slides[idx - 1], slides[idx]];
    } else if (direction === 'down' && idx < slides.length - 1) {
      [slides[idx], slides[idx + 1]] = [slides[idx + 1], slides[idx]];
    }
    setForm({ ...form, slides: slides.map((s, i) => ({ ...s, order: i + 1 })) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Homepage</h1>
        <p className="text-sm text-muted-foreground">Manage hero banner slideshow and homepage content</p>
      </div>

      {/* Hero Slideshow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Image className="w-4 h-4" />
            Hero Slideshow Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Add image URLs for the hero slideshow. If no slides are added, default images will be used.
          </p>

          {/* Existing slides */}
          <div className="space-y-3">
            {(form.slides || []).map((slide, idx) => (
              <div key={slide.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                <div className="flex flex-col gap-1 pt-1">
                  <button onClick={() => moveSlide(slide.id, 'up')} className="text-muted-foreground hover:text-foreground text-xs" disabled={idx === 0}>▲</button>
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <button onClick={() => moveSlide(slide.id, 'down')} className="text-muted-foreground hover:text-foreground text-xs" disabled={idx === (form.slides?.length || 0) - 1}>▼</button>
                </div>
                {slide.imageUrl && (
                  <div className="w-24 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img src={slide.imageUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground">Slide {idx + 1}</Label>
                  <Input
                    value={slide.imageUrl}
                    onChange={e => updateSlideUrl(slide.id, e.target.value)}
                    placeholder="Image URL"
                    className="text-xs"
                  />
                </div>
                <div className="flex gap-1 pt-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toggleSlideVisibility(slide.id)}>
                    {slide.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeSlide(slide.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add new slide */}
          <div className="flex gap-2">
            <Input
              value={newSlideUrl}
              onChange={e => setNewSlideUrl(e.target.value)}
              placeholder="Paste image URL to add a new slide..."
              onKeyDown={e => e.key === 'Enter' && addSlide()}
            />
            <Button onClick={addSlide} variant="outline" className="flex-shrink-0">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hero Text */}
      <Card>
        <CardHeader><CardTitle className="text-base">Hero Text & CTA</CardTitle></CardHeader>
        <CardContent className="space-y-4">
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
