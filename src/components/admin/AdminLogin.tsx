import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Thozhi Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={error ? 'border-destructive' : ''}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">Incorrect password</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Default password: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">thozhi2026</code>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
