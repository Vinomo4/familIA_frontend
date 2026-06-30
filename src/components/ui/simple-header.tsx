import React from "react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggle } from "@/components/ui/menu-toggle";

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);

  const links = [
    {
      label: "Funciones",
      href: "#funciones",
    },
    {
      label: "Precios",
      href: "#precios",
    },
    {
      label: "Acerca de",
      href: "#nosotros",
    },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="FamilIA Logo"
            className="block h-10 w-auto transition-transform group-hover:scale-105"
          />
          <p className="text-xl font-bold text-gray-900">
            Famil<span className="text-[#34d399]">IA</span>
          </p>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
              onClick={() => setOpen(false)}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" asChild>
            <Link to="/auth/signin">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/signup">Comenzar</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuToggle strokeWidth={2.5} open={open} onOpenChange={setOpen} className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
            showClose={false}
            side="left"
          >
            <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
              {links.map((link) => (
                <a
                  className={buttonVariants({
                    variant: "ghost",
                    className: "justify-start",
                  })}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <SheetFooter>
              <Button variant="outline" asChild>
                <Link to="/auth/signin">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">Comenzar</Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}