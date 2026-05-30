export type Severity = "info" | "warning" | "critical";
export type EventType = "consulta" | "emergencia" | "documento";

export interface ActivityEvent {
  id: string;
  timestamp: string; // ISO
  type: EventType;
  description: string;
  severity: Severity;
}

export const mockActivity: ActivityEvent[] = [
  { id: "1", timestamp: "2026-05-30T10:14:00", type: "documento", description: "El usuario solicitó explicación de una carta del banco.", severity: "info" },
  { id: "2", timestamp: "2026-05-30T09:42:00", type: "consulta", description: "Consulta sobre el horario de la farmacia más cercana.", severity: "info" },
  { id: "3", timestamp: "2026-05-29T18:05:00", type: "emergencia", description: "Llamada entrante sospechosa bloqueada (posible estafa telefónica).", severity: "critical" },
  { id: "4", timestamp: "2026-05-29T12:30:00", type: "documento", description: "Aclaración sobre comisión recibida en extracto bancario.", severity: "warning" },
  { id: "5", timestamp: "2026-05-28T17:11:00", type: "consulta", description: "Pregunta sobre cómo enviar una foto por WhatsApp.", severity: "info" },
  { id: "6", timestamp: "2026-05-28T11:02:00", type: "documento", description: "Lectura asistida de un aviso del ayuntamiento.", severity: "info" },
  { id: "7", timestamp: "2026-05-27T20:45:00", type: "emergencia", description: "El usuario activó el botón de emergencia (falsa alarma confirmada).", severity: "warning" },
  { id: "8", timestamp: "2026-05-27T09:20:00", type: "consulta", description: "Consulta sobre la previsión meteorológica del fin de semana.", severity: "info" },
  { id: "9", timestamp: "2026-05-26T16:00:00", type: "documento", description: "Revisión de un correo postal de la mutua sanitaria.", severity: "info" },
  { id: "10", timestamp: "2026-05-26T10:15:00", type: "consulta", description: "Consulta sobre dosis de un medicamento.", severity: "warning" },
  { id: "11", timestamp: "2026-05-25T19:30:00", type: "emergencia", description: "SMS de phishing detectado y descartado por el asistente.", severity: "critical" },
  { id: "12", timestamp: "2026-05-25T08:50:00", type: "consulta", description: "Pregunta sobre noticias locales del día.", severity: "info" },
  { id: "13", timestamp: "2026-05-24T14:22:00", type: "documento", description: "Resumen de una factura de la compañía eléctrica.", severity: "info" },
  { id: "14", timestamp: "2026-05-24T09:08:00", type: "consulta", description: "Recordatorio de cita médica programada.", severity: "info" },
  { id: "15", timestamp: "2026-05-23T18:40:00", type: "documento", description: "Lectura de instrucciones de un electrodoméstico nuevo.", severity: "info" },
  { id: "16", timestamp: "2026-05-23T11:00:00", type: "emergencia", description: "Detección de llamada de supuesto soporte técnico fraudulento.", severity: "critical" },
  { id: "17", timestamp: "2026-05-22T15:30:00", type: "consulta", description: "Consulta sobre transporte público al centro de la ciudad.", severity: "info" },
  { id: "18", timestamp: "2026-05-22T10:10:00", type: "documento", description: "Aclaración sobre carta de la Seguridad Social.", severity: "info" },
  { id: "19", timestamp: "2026-05-21T19:00:00", type: "consulta", description: "Pregunta sobre receta de cocina tradicional.", severity: "info" },
  { id: "20", timestamp: "2026-05-21T09:45:00", type: "documento", description: "Revisión de un recibo del seguro del hogar.", severity: "info" },
];

export const mockMetrics = {
  dudasResueltas: 47,
  amenazasBloqueadas: 6,
  efectivoEstimado: 185,
};

// 30 días de datos financieros (saldo digital + efectivo estimado)
export const mockFinanceSeries = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const digital = 2400 - i * 15 + Math.round(Math.sin(i / 3) * 80);
  const efectivo = 220 - i * 1.2 + Math.round(Math.cos(i / 4) * 18);
  return {
    date: date.toISOString().slice(0, 10),
    digital,
    efectivo: Math.max(50, Math.round(efectivo)),
  };
});

export const mockAnomalies = [
  {
    id: "a1",
    title: "Cargo duplicado detectado",
    description: "Se han registrado dos cargos idénticos de 24,90 € de 'Suscripción Streaming' en 24h.",
    severity: "warning" as Severity,
    date: "2026-05-28",
  },
  {
    id: "a2",
    title: "Comisión inusual",
    description: "Comisión de mantenimiento de 12,50 € superior a la media histórica (3,20 €).",
    severity: "warning" as Severity,
    date: "2026-05-25",
  },
  {
    id: "a3",
    title: "Retirada en cajero fuera de zona habitual",
    description: "Retirada de 100 € en un cajero a 35 km del domicilio del usuario.",
    severity: "critical" as Severity,
    date: "2026-05-22",
  },
];

export const mockInvoices = [
  { id: "INV-2026-05", date: "2026-05-01", plan: "Pro Mensual", amount: "9,99 €", status: "Pagada" },
  { id: "INV-2026-04", date: "2026-04-01", plan: "Pro Mensual", amount: "9,99 €", status: "Pagada" },
  { id: "INV-2026-03", date: "2026-03-01", plan: "Pro Mensual", amount: "9,99 €", status: "Pagada" },
];

export const mockUpcomingCharges = [
  { id: "u1", concept: "Suscripción Streaming", amount: "24,90 €", date: "2026-06-03" },
  { id: "u2", concept: "Recibo Luz", amount: "62,40 €", date: "2026-06-08" },
  { id: "u3", concept: "Seguro Hogar", amount: "31,10 €", date: "2026-06-12" },
];
