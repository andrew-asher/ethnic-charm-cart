import { useState } from 'react';
import { useAdmin, AdminProduct } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Star, Sparkles, AlertTriangle, Image } from 'lucide-react';
import { toast } from 'sonner';

const emptyProduct: AdminProduct = {
  id: '', name: '', subtitle: '', price: 0, category: 'Tops' as any,
  image: '', images: [], description: '', qualityNote: '',
  sizes: [], colors: [], featured: false, isNewCollection: false,
  isLimitedStock: false, visible: true, collection: '', oldPrice: undefined,
  stockQuantity: undefined, stockLabel: '',
};

const Products = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [sizesInput, setSizesInput] = useState('');
  const [colorsInput, setColorsInput] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const openNew = () => {
    setEditing({ ...emptyProduct, id: `prod-${Date.now()}` });
    setSizesInput('S, M, L, XL');
    setColorsInput('');
    setIsNew(true);
  };

  const openEdit = (p: AdminProduct) => {
    setEditing({ ...p });
    setSizesInput(p.sizes.join(', '));
    setColorsInput(p.colors.join(', '));
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    const product = {
      ...editing,
      sizes: sizesInput.split(',').map(s => s.trim()).filter(Boolean),
      colors: colorsInput.split(',').map(s => s.trim()).filter(Boolean),
      badge: editing.isNewCollection ? 'New Collection' as const : editing.isLimitedStock ? 'Limited Stock' as const : undefined,
    };
    if (isNew) addProduct(product);
    else updateProduct(product.id, product);
    setEditing(null);
    toast.success(isNew ? 'Product added!' : 'Product updated!');
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
      toast.success('Product deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} total products</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Product</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden">
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <Image className="w-full h-full p-2 text-muted-foreground" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{p.category}</Badge></TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">£{p.price}</span>
                    {p.oldPrice && <span className="text-xs text-muted-foreground line-through ml-1">£{p.oldPrice}</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {!p.visible && <Badge variant="outline" className="text-xs"><EyeOff className="w-3 h-3 mr-1" />Hidden</Badge>}
                      {p.isNewCollection && <Badge className="text-xs bg-primary/10 text-primary border-0"><Sparkles className="w-3 h-3 mr-1" />New</Badge>}
                      {p.isLimitedStock && <Badge className="text-xs bg-rose/10 text-rose border-0"><AlertTriangle className="w-3 h-3 mr-1" />Limited</Badge>}
                      {p.featured && <Badge className="text-xs bg-gold/10 text-gold border-0"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No products found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Modal */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{isNew ? 'Add Product' : 'Edit Product'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Short Title</Label>
                  <Input value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editing.category} onValueChange={v => setEditing({ ...editing, category: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price (£)</Label>
                  <Input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Old Price (£)</Label>
                  <Input type="number" value={editing.oldPrice || ''} onChange={e => setEditing({ ...editing, oldPrice: Number(e.target.value) || undefined })} placeholder="Optional" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="Paste image URL or upload later" />
                {editing.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img src={editing.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Quality Note</Label>
                <Input value={editing.qualityNote} onChange={e => setEditing({ ...editing, qualityNote: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sizes (comma-separated)</Label>
                  <Input value={sizesInput} onChange={e => setSizesInput(e.target.value)} placeholder="S, M, L, XL" />
                </div>
                <div className="space-y-2">
                  <Label>Colors (comma-separated)</Label>
                  <Input value={colorsInput} onChange={e => setColorsInput(e.target.value)} placeholder="Red, Blue" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Collection</Label>
                  <Input value={editing.collection || ''} onChange={e => setEditing({ ...editing, collection: e.target.value })} placeholder="Optional" />
                </div>
                <div className="space-y-2">
                  <Label>Stock Label</Label>
                  <Input value={editing.stockLabel || ''} onChange={e => setEditing({ ...editing, stockLabel: e.target.value })} placeholder="e.g. Limited Stock" />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>Visible on site</Label>
                  <Switch checked={editing.visible} onCheckedChange={v => setEditing({ ...editing, visible: v })} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>Featured</Label>
                  <Switch checked={editing.featured} onCheckedChange={v => setEditing({ ...editing, featured: v })} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>New Collection</Label>
                  <Switch checked={editing.isNewCollection} onCheckedChange={v => setEditing({ ...editing, isNewCollection: v, isLimitedStock: v ? false : editing.isLimitedStock })} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <Label>Limited Stock</Label>
                  <Switch checked={editing.isLimitedStock} onCheckedChange={v => setEditing({ ...editing, isLimitedStock: v, isNewCollection: v ? false : editing.isNewCollection })} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave}>{isNew ? 'Add Product' : 'Save Changes'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Product?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
