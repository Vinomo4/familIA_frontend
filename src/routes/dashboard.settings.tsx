import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Download, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ELDER_NAME_STORAGE_KEY,
  ELDER_PIN_STORAGE_KEY,
  getStoredElderName,
} from "@/lib/elder-profile";
import { mockInvoices, mockMetrics } from "@/lib/dashboard-mocks";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [cash, setCash] = useState(String(mockMetrics.efectivoEstimado));

  useEffect(() => {
    setName(getStoredElderName() ?? "");
  }, []);

  const handleSaveElder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    if (pin && pin.length !== 4) {
      toast.error("El PIN debe tener 4 dígitos");
      return;
    }
    localStorage.setItem(ELDER_NAME_STORAGE_KEY, name.trim());
    if (pin.length === 4) localStorage.setItem(ELDER_PIN_STORAGE_KEY, pin);
    toast.success("Datos del mayor actualizados");
    setPin("");
  };

  const handleResetBaseline = () => {
    toast.success(`Línea base de efectivo reseteada a ${cash} €`);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Configuración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mantén el sistema afinado y gestiona tu suscripción.
        </p>
      </motion.div>

      <Tabs defaultValue="mayor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mayor">Mayor</TabsTrigger>
          <TabsTrigger value="calibracion">Calibración</TabsTrigger>
          <TabsTrigger value="suscripcion">Suscripción</TabsTrigger>
        </TabsList>

        <TabsContent value="mayor">
          <Card className="rounded-2xl border-border/40 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Datos del mayor</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Modifica el nombre de pila y el PIN de 4 dígitos del acceso del mayor.
            </p>
            <form onSubmit={handleSaveElder} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="elder-name">Nombre de pila</Label>
                <Input
                  id="elder-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="p. ej. María"
                  className="max-w-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Nuevo PIN (opcional)</Label>
                <InputOTP maxLength={4} value={pin} onChange={setPin}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-muted-foreground">Déjalo vacío para mantener el PIN actual.</p>
              </div>
              <Button type="submit">Guardar cambios</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="calibracion">
          <Card className="rounded-2xl border-border/40 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Calibración de efectivo</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Si el mayor ha perdido la cuenta, corrige aquí el efectivo a mano para resetear la línea base.
            </p>
            <div className="mt-6 flex max-w-sm items-end gap-3">
              <div className="flex-1 space-y-2">
                <Label htmlFor="cash">Efectivo a mano (€)</Label>
                <Input id="cash" type="number" value={cash} onChange={(e) => setCash(e.target.value)} />
              </div>
              <Button onClick={handleResetBaseline} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Resetear
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suscripcion">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border-border/40 p-6 shadow-sm lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
                    Plan actual
                  </Badge>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">Pro Mensual</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Protección activa 24/7, monitorización financiera y soporte prioritario.
                  </p>
                </div>
                <p className="text-2xl font-semibold text-gray-900">9,99 €<span className="text-sm text-muted-foreground">/mes</span></p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => navigate({ to: "/pricing" })}>Cambiar plan</Button>
                <Button variant="outline">Cancelar suscripción</Button>
              </div>
            </Card>

            <Card className="rounded-2xl border-border/40 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">Método de pago</h3>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-border/60 p-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Visa •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expira 09/28</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Actualizar tarjeta
              </Button>
            </Card>
          </div>

          <Card className="mt-4 rounded-2xl border-border/40 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900">Facturas</h3>
            <ul className="mt-3 divide-y divide-border/50">
              {mockInvoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date} · {inv.plan}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      {inv.status}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{inv.amount}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      onClick={() => toast.success(`Descargando ${inv.id}…`)}
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
