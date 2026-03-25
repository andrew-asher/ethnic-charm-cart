import { useState } from 'react';
import { useAdmin, Testimonial } from '@/context/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Quote, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Testimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditing({ id: `test-${Date.now()}`, name: '', quote: '', avatar: '', visible: true });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing || !editing.name.trim() || !editing.quote.trim()) { toast.error('Name and quote required'); return; }
    if (isNew) addTestimonial(editing);
    else updateTestimonial(editing.id, editing);
    setEditing(null);
    toast.success(isNew ? 'Testimonial added!' : 'Updated!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Testimonial</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(t => (
          <Card key={t.id} className="border-border/50">
            <CardContent className="p-4">
              <Quote className="w-5 h-5 text-primary/40 mb-2" />
              <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                {!t.visible && <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
              <div className="flex gap-1 mt-3">
                <Button variant="ghost" size="sm" onClick={() => { setEditing({ ...t }); setIsNew(false); }}><Pencil className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(t.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display">{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Customer Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Quote</Label><Textarea value={editing.quote} onChange={e => setEditing({ ...editing, quote: e.target.value })} rows={3} /></div>
              <div className="space-y-2"><Label>Avatar URL (optional)</Label><Input value={editing.avatar} onChange={e => setEditing({ ...editing, avatar: e.target.value })} /></div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <Label>Visible on homepage</Label>
                <Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave}>{isNew ? 'Add' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Testimonial?</DialogTitle></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { deleteTestimonial(deleteId!); setDeleteId(null); toast.success('Deleted'); }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Testimonials;
