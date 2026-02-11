import { GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  showMockTestLink?: boolean;
}

const Header = ({ showMockTestLink = true }: HeaderProps) => {
  const location = useLocation(); // 👈 get current route

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Excellence Institute
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          
          {/* ✅ Hide Home when already on home page */}
          {location.pathname !== "/" && (
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          )}
         
          {showMockTestLink && (
            <Link 
              to="/mock-test" 
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              CET Mock Test
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary hover:bg-primary/10"
              >
                Free
              </Badge>
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
