import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showMockTestLink?: boolean;
}

const Header = ({ showMockTestLink = true }: HeaderProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-base sm:text-lg font-semibold text-foreground">
            Excellence Institute
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">

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

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-4">

          {location.pathname !== "/" && (
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
          )}

          {showMockTestLink && (
            <Link
              to="/mock-test"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-primary"
            >
              CET Mock Test
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary"
              >
                Free
              </Badge>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
