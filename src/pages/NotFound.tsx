import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md w-full">
        
        {/* 404 Number */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Button */}
        <Link to="/" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
