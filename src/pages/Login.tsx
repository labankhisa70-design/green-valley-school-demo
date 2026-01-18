import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Eye, EyeOff, Loader2, User, KeyRound } from 'lucide-react';
import { UserRole } from '@/data/mockData';

const demoCredentials = [
  { role: 'Admin', email: 'admin@demo.school', password: 'Admin@123', color: 'bg-primary' },
  { role: 'Teacher', email: 'teacher1@demo.school', password: 'Teacher@123', color: 'bg-info' },
  { role: 'Parent', email: 'parent1@demo.school', password: 'Parent@123', color: 'bg-warning' },
  { role: 'Student', email: 'student1@demo.school', password: 'Student@123', color: 'bg-accent' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Get role from session storage to redirect
      const stored = sessionStorage.getItem('gvs_user');
      if (stored) {
        const user = JSON.parse(stored);
        const dashboardPaths: Record<UserRole, string> = {
          admin: '/admin',
          teacher: '/teacher',
          parent: '/parent',
          student: '/student',
        };
        navigate(dashboardPaths[user.role as UserRole]);
      }
    } else {
      setError(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
          <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <GraduationCap className="w-12 h-12 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Green Valley</h1>
            <h2 className="text-xl font-medium text-primary">School Management System</h2>
            <p className="text-muted-foreground mt-2">Primary & Junior Secondary School</p>
            <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
          </div>
          <div className="w-full max-w-sm space-y-3 mt-8">
            <p className="text-sm font-medium text-muted-foreground">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => fillCredentials(cred.email, cred.password)}
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${cred.color}`} />
                    <span className="font-medium text-sm">{cred.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{cred.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-card animate-slide-up border-border/50">
          <CardHeader className="text-center space-y-4 pb-2">
            <div className="lg:hidden flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Green Valley</h1>
                <p className="text-sm text-muted-foreground">School Management System</p>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Mobile demo credentials */}
            <div className="lg:hidden pt-4 border-t border-border">
              <p className="text-sm font-medium text-center text-muted-foreground mb-3">Quick Login</p>
              <div className="grid grid-cols-2 gap-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    onClick={() => fillCredentials(cred.email, cred.password)}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors"
                  >
                    {cred.role}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
