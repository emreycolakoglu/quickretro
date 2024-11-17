import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">logo</div>
        <nav>
          <Button variant="ghost" asChild>
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 RetroMeet. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          {" • "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
      <TanStackRouterDevtools />
    </div>
  ),
});
