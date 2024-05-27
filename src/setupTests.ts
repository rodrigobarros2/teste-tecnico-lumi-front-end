import "@testing-library/jest-dom";
import { vi } from "vitest";

// Este método é necessário para a criação de gráficos no ambiente de testes
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: vi.fn().mockImplementation((contextType) => {
    if (contextType === "2d") {
      return {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(),
        putImageData: vi.fn(),
        createImageData: vi.fn(),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
      };
    } else if (contextType === "webgl" || contextType === "webgl2") {
      return {};
    }
    return null;
  }),
});
