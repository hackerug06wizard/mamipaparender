import LoginForm from '@/components/admin/login-form';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your products</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
