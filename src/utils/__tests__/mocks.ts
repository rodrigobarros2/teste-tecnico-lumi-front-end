import { vi } from "vitest";

export const compareDatesChronologically = vi.fn((a, b) => new Date(a).getTime() - new Date(b).getTime());

export const calculateCompensatedEnergyKWh = vi.fn((dataApi) => dataApi.map(() => Math.floor(Math.random() * 100)));
