import { useState } from 'react';
import { useAdmin, AdminCategory, AdminSubcategory } from '@/context/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, GripVertical, Image, EyeOff, X } from 'lucide-react';
import { toast } from 'sonner';

const Categories = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState('');

  const openNew = () => {
    setEditing({ id: `cat-${Date.now()}`, name: '', description: '', image: '', order: categories.length + 1, visible: true, subcategories: [] });
    setIsNew(true);
  };

  const openEdit = (c: AdminCategory) => { setEditing({ ...c, subcategories: [...(c.subcategories || [])] }); setIsNew(false); };

  const handleSave = () => {
    if (!editing || !editing.name.trim()) { toast.error('Category name is required'); return; }
    if (isNew) addCategory(editing);
    else updateCategory(editing.id, editing);
    setEditing(null);
    toast.success(isNew ? 'Category added!' : 'Category updated!');
  };

  const handleDelete = () => {
    if (deleteId) {
      const count = products.filter(p => categories.find(c => c.id === deleteId)?.name === p.category).length;
      if (count > 0) { toast.error(`Cannot delete: ${count} products in this category`); setDeleteId(null); return; }
      deleteCategory(deleteId);
      setDeleteId(null);
      toast.success('Category deleted');
    }
  };

  const addSubcategory = () => {
    if (!editing || !newSubName.trim()) return;
    const sub: AdminSubcategory = { id: `sub-${Date.now()}`, name: newSubName.trim(), order: (editing.subcategories || []).length + 1 };
    setEditing({ ...editing, subcategories: [...(editing.subcategories || []), sub] });
    setNewSubName('');
  };

  const removeSubcategory = (subId: string) => {
    if (!editing) return;
    setEditing({ ...editing, subcategories: (editing.subcategories || []).filter(s => s.id !== subId) });
  };

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Category</Button>
      </div>

      <div className="grid gap-4">
        {sorted.map(cat => {
          const count = products.filter(p => p.category === cat.name).length;
          return (
            <Card key={cat.id} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab shrink-0" />
                <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
                  {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" /> : <Image className="w-full h-full p-3 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{cat.name}</h3>
                    {!cat.visible && <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{cat.description || 'No description'}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{count} products</span>
                    {(cat.subcategories || []).length > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        {(cat.subcategories || []).map(sub => (
                          <Badge key={sub.id} variant="secondary" className="text-[10px] px-1.5 py-0">{sub.name}</Badge>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{isNew ? 'Add Category' : 'Edit Category'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Image URL</Label><Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="Paste image URL" /></div>
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={editing.order} onChange={e => setEditing({ ...editing, order: Number(e.target.value) })} /></div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <Label>Visible</Label>
                <Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} />
              </div>
              {/* Subcategories */}
              <div className="space-y-3">
                <Label>Subcategories ({(editing.subcategories || []).length})</Label>
                <div className="flex gap-2">
                  <Input value={newSubName} onChange={e => setNewSubName(e.target.value)} placeholder="e.g. Wedding Collection" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubcategory())} />
                  <Button type="button" size="sm" onClick={addSubcategory} disabled={!newSubName.trim()}><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editing.subcategories || []).map(sub => (
                    <Badge key={sub.id} variant="outline" className="gap-1 pr-1">
                      {sub.name}
                      <button onClick={() => removeSubcategory(sub.id)} className="ml-1 hover:text-destructive"><X className="w-3 h-3" /></button>
                    </Badge>
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
          <DialogHeader><DialogTitle>Delete Category?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This cannot be undone. Categories with products cannot be deleted.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
