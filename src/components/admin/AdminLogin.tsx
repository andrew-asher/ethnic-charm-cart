import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import thozhyLogo from '@/assets/thozhy-logo.jpeg';

const AdminLogin = () => {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-warm-brown flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={thozhyLogo} alt="Thozhy" className="w-20 h-20 mx-auto mb-4 rounded-full object-cover ring-2 ring-primary/40 shadow-lg" />
          <h1 className="font-display text-2xl font-bold text-gradient-hero">Thozhy Admin</h1>
          <p className="text-sm text-primary-foreground/50 mt-1">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`bg-charcoal border-border text-primary-foreground placeholder:text-muted-foreground ${error ? 'border-destructive' : ''}`}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">Incorrect password</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:brightness-110">Sign In</Button>
        </form>
        <p className="text-xs text-primary-foreground/30 text-center mt-6">
          Default password: <code className="bg-charcoal px-1.5 py-0.5 rounded text-xs text-primary-foreground/50">thozhi2026</code>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
