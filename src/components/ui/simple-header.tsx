import React from "react";
// Importamos Link también aquí para usarlo en el logo
import { Link } from "@tanstack/react-router";
// Eliminada la importación de Grid2x2PlusIcon ya que usaremos el PNG
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
      href: "#",
    },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        {/* --- SECCIÓN DEL LOGO ACTUALIZADA --- */}
        {/* Envolvemos todo en un Link para volver al inicio ('to="/"') */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Etiqueta img estándar. Al empezar con '/', busca en la carpeta 'public'.
            Asegúrate de que el nombre del archivo coincida (ej. logo.png).
          */}
          <img 
            src="/logo.png" 
            alt="FamilIA Logo" 
            // Ajusta la altura (h-8 = 32px) según necesites. La anchura se ajusta sola.
            className="h-10 w-auto block transition-transform group-hover:scale-105" 
          />
          {/* Mantenemos el texto, pero cambiamos la fuente a sans para que sea más moderna */}
          <p className="text-xl font-bold text-gray-900">
            Famil<span className="text-[#34d399]">IA</span>
          </p>
        </Link>
        {/* -------------------------------------- */}

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