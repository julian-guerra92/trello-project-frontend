import { Card } from '@/components/ui/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-base-content/60 mt-2">{subtitle}</p>}
        </div>
        {children}
      </Card>
    </div>
  );
};
