import { describe, it, expect } from "vitest";
import { backendClient } from "../api";

describe("backendClient", () => {
  it("should be configured with the correct baseURL", () => {
    const baseURL = import.meta.env.VITE_REACT_API_URL;
    expect(backendClient.defaults.baseURL).toBe(baseURL);
  });
});
