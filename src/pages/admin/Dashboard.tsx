import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, FolderOpen, Layers, Star, AlertTriangle, Sparkles, Plus, Settings, Monitor, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { products, categories, collections, testimonials } = useAdmin();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-primary' },
    { label: 'Categories', value: categories.length, icon: FolderOpen, color: 'text-accent' },
    { label: 'Collections', value: collections.length, icon: Layers, color: 'text-sage' },
    { label: 'Featured', value: products.filter(p => p.featured).length, icon: Star, color: 'text-gold' },
    { label: 'Limited Stock', value: products.filter(p => p.isLimitedStock).length, icon: AlertTriangle, color: 'text-rose' },
    { label: 'New Collection', value: products.filter(p => p.isNewCollection).length, icon: Sparkles, color: 'text-primary' },
  ];

  const quickActions = [
    { label: 'Add Product', icon: Plus, onClick: () => navigate('/admin/products') },
    { label: 'Manage Collections', icon: Layers, onClick: () => navigate('/admin/collections') },
    { label: 'Update Homepage', icon: Monitor, onClick: () => navigate('/admin/homepage') },
    { label: 'WhatsApp Settings', icon: MessageSquare, onClick: () => navigate('/admin/whatsapp') },
  ];

  const categoryBreakdown = categories.map(cat => ({
    name: cat.name,
    count: products.filter(p => p.category === cat.name).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back to Thozhi Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {quickActions.map(action => (
              <Button key={action.label} variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={action.onClick}>
                <action.icon className="w-5 h-5 text-primary" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader><CardTitle className="text-base">Products by Category</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {categoryBreakdown.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${products.length ? (cat.count / products.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-foreground w-6 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Products</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category} · £{p.price}</p>
                </div>
                <div className="flex gap-1">
                  {p.isNewCollection && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">New</span>}
                  {p.isLimitedStock && <span className="text-[10px] bg-rose/10 text-rose px-2 py-0.5 rounded-full">Limited</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
