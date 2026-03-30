import { NavLink, Outlet } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';
import {
  LayoutDashboard, Package, FolderOpen, Layers, Monitor, MessageSquare,
  Star, FileText, LogOut, Menu, X, ChevronLeft, Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/collections', icon: Layers, label: 'Collections' },
  { to: '/admin/combos', icon: Gift, label: 'Combo Offers' },
  { to: '/admin/homepage', icon: Monitor, label: 'Homepage' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/whatsapp', icon: MessageSquare, label: 'WhatsApp' },
  { to: '/admin/content', icon: FileText, label: 'Site Content' },
];

const AdminLayout = () => {
  const { logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border z-50 flex flex-col transition-all duration-300",
        sidebarOpen ? "w-60" : "w-16",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && <span className="text-gradient-hero font-display text-lg font-bold">Thozhy</span>}
          <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                !sidebarOpen && "justify-center"
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-2 border-t border-border">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Monitor className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>View Site</span>}
          </NavLink>
          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors w-full",
              !sidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "lg:ml-60" : "lg:ml-16")}>
        <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-4 sticky top-0 z-30">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="font-display text-lg font-semibold text-foreground">Admin Panel</h2>
        </header>

        <main className="p-4 md:p-6 lg:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
