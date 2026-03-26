import { useState } from 'react';
import { useAdmin, ComboOffer } from '@/context/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Save, Gift } from 'lucide-react';
import { toast } from 'sonner';

const emptyCombo: ComboOffer = {
  id: '', title: '', description: '', image: '', productIds: [],
  originalPrice: 0, comboPrice: 0, badge: 'Combo Offer',
  featured: false, visible: true,
};

const ComboOffers = () => {
  const { comboOffers, addComboOffer, updateComboOffer, deleteComboOffer, products } = useAdmin();
  const [editing, setEditing] = useState<ComboOffer | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => {
    setEditing({ ...emptyCombo, id: `combo-${Date.now()}` });
    setIsNew(true);
  };

  const openEdit = (c: ComboOffer) => {
    setEditing({ ...c });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) { toast.error('Title is required'); return; }
    if (editing.productIds.length < 2) { toast.error('Select at least 2 products'); return; }
    if (isNew) addComboOffer(editing);
    else updateComboOffer(editing.id, editing);
    toast.success(isNew ? 'Combo offer created!' : 'Combo offer updated!');
    setEditing(null);
  };

  const toggleProduct = (productId: string) => {
    if (!editing) return;
    const ids = editing.productIds.includes(productId)
      ? editing.productIds.filter(id => id !== productId)
      : [...editing.productIds, productId];
    // Auto-calculate original price
    const origPrice = products.filter(p => ids.includes(p.id)).reduce((sum, p) => sum + p.price, 0);
    setEditing({ ...editing, productIds: ids, originalPrice: origPrice });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteComboOffer(deleteId);
      toast.success('Combo offer deleted');
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Combo Offers</h1>
          <p className="text-sm text-muted-foreground mt-1">Create special bundle deals</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" /> Add Combo</Button>
      </div>

      {comboOffers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Gift className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No combo offers yet. Create your first bundle deal!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {comboOffers.map(combo => {
            const comboProducts = products.filter(p => combo.productIds.includes(p.id));
            return (
              <Card key={combo.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {combo.image ? (
                      <img src={combo.image} alt={combo.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                        <Gift className="w-6 h-6 text-primary/40" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-sm font-bold text-foreground truncate">{combo.title}</h3>
                          <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">{combo.badge}</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(combo)}>
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(combo.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-primary">£{combo.comboPrice}</span>
                        <span className="text-xs text-muted-foreground line-through">£{combo.originalPrice}</span>
                        {combo.originalPrice > 0 && (
                          <span className="text-[10px] text-accent font-medium">
                            Save {Math.round(((combo.originalPrice - combo.comboPrice) / combo.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 truncate">
                        {comboProducts.map(p => p.name).join(' + ')}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {combo.featured && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Featured</span>}
                        {!combo.visible && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Hidden</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit/Add Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Create Combo Offer' : 'Edit Combo Offer'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Kurti + Jimmiki Combo" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} placeholder="Describe this combo deal" />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <Label>Badge Label</Label>
                <Input value={editing.badge} onChange={e => setEditing({ ...editing, badge: e.target.value })} placeholder="Combo Offer" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Original Price (auto)</Label>
                  <Input type="number" value={editing.originalPrice} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <Label>Combo Price (£)</Label>
                  <Input type="number" value={editing.comboPrice} onChange={e => setEditing({ ...editing, comboPrice: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={editing.featured} onCheckedChange={v => setEditing({ ...editing, featured: v })} />
                  <Label>Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} />
                  <Label>Visible</Label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Select Products ({editing.productIds.length} selected)</Label>
                <div className="border rounded-lg max-h-48 overflow-y-auto p-2 space-y-1">
                  {products.filter(p => p.visible).map(p => (
                    <label key={p.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/50 cursor-pointer text-sm">
                      <Checkbox
                        checked={editing.productIds.includes(p.id)}
                        onCheckedChange={() => toggleProduct(p.id)}
                      />
                      <span className="truncate">{p.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">£{p.price} · {p.category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button onClick={handleSave} className="w-full gap-2"><Save className="w-4 h-4" /> Save Combo</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Combo Offer?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComboOffers;
