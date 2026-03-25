import { useState } from 'react';
import { useAdmin, AdminCollection } from '@/context/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Image, Layers } from 'lucide-react';
import { toast } from 'sonner';

const Collections = () => {
  const { collections, products, addCollection, updateCollection, deleteCollection } = useAdmin();
  const [editing, setEditing] = useState<AdminCollection | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditing({ id: `col-${Date.now()}`, title: '', subtitle: '', description: '', bannerImage: '', productIds: [], featured: false, visible: true });
    setIsNew(true);
  };

  const openEdit = (c: AdminCollection) => { setEditing({ ...c }); setIsNew(false); };

  const handleSave = () => {
    if (!editing || !editing.title.trim()) { toast.error('Title is required'); return; }
    if (isNew) addCollection(editing);
    else updateCollection(editing.id, editing);
    setEditing(null);
    toast.success(isNew ? 'Collection added!' : 'Collection updated!');
  };

  const toggleProductInCollection = (productId: string) => {
    if (!editing) return;
    const ids = editing.productIds.includes(productId)
      ? editing.productIds.filter(id => id !== productId)
      : [...editing.productIds, productId];
    setEditing({ ...editing, productIds: ids });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Collections</h1>
          <p className="text-sm text-muted-foreground">{collections.length} collections</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Collection</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {collections.map(col => (
          <Card key={col.id} className="border-border/50 overflow-hidden">
            <div className="h-32 bg-muted relative">
              {col.bannerImage ? <img src={col.bannerImage} alt={col.title} className="w-full h-full object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center"><Layers className="w-8 h-8 text-muted-foreground" /></div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {col.featured && <Badge className="bg-gold/90 text-foreground border-0 text-xs"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                {!col.visible && <Badge variant="outline" className="bg-card/80 text-xs"><EyeOff className="w-3 h-3 mr-1" />Hidden</Badge>}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{col.title}</h3>
              <p className="text-sm text-muted-foreground">{col.subtitle || 'No subtitle'}</p>
              <p className="text-xs text-muted-foreground mt-1">{col.productIds.length} products assigned</p>
              <div className="flex gap-1 mt-3">
                <Button variant="outline" size="sm" onClick={() => openEdit(col)}><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                <Button variant="outline" size="sm" onClick={() => setDeleteId(col.id)} className="text-destructive border-destructive/30"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{isNew ? 'Add Collection' : 'Edit Collection'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Title</Label><Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
                <div className="space-y-2"><Label>Subtitle</Label><Input value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Banner Image URL</Label><Input value={editing.bannerImage} onChange={e => setEditing({ ...editing, bannerImage: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>Featured</Label>
                  <Switch checked={editing.featured} onCheckedChange={v => setEditing({ ...editing, featured: v })} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>Visible</Label>
                  <Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} />
                </div>
              </div>
              {/* Product picker */}
              <div className="space-y-2">
                <Label>Assign Products ({editing.productIds.length} selected)</Label>
                <div className="border border-border rounded-lg max-h-48 overflow-y-auto p-2 space-y-1">
                  {products.map(p => (
                    <label key={p.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer text-sm">
                      <input type="checkbox" checked={editing.productIds.includes(p.id)} onChange={() => toggleProductInCollection(p.id)} className="rounded" />
                      <span className="text-foreground">{p.name}</span>
                      <Badge variant="secondary" className="text-xs ml-auto">{p.category}</Badge>
                    </label>
                  ))}
                </div>
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
          <DialogHeader><DialogTitle>Delete Collection?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { deleteCollection(deleteId!); setDeleteId(null); toast.success('Deleted'); }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collections;
