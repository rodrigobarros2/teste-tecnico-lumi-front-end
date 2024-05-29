import { vi } from "vitest";
import { Home } from "./page/Home";
import { InfoClient } from "./page/InfoClient";
import { render, screen } from "@testing-library/react";

vi.mock("./hook/useUserData", () => ({
  LuminiProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("react-toastify", () => ({
  ToastContainer: () => null,
}));

vi.mock("./page/Home", () => ({
  Home: () => <div>Home</div>,
}));

vi.mock("./page/InfoClient", () => ({
  InfoClient: () => <div>Número do Cliente</div>,
}));

describe("App", () => {
  it("renders Home component when '/' route is matched", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders InfoClient component when '/user' route is matched", () => {
    render(<InfoClient />);
    expect(screen.getByText("Número do Cliente")).toBeInTheDocument();
  });
});
