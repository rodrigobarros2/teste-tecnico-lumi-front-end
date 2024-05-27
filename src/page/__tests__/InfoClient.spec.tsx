import { vi } from "vitest";
import { InfoClient } from "../InfoClient";
import { BrowserRouter } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";
import { getPdfDownload } from "../../modules/users";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("../../hook/useUserData", () => ({
  useUserData: vi.fn(),
}));

vi.mock("../../modules/users", () => ({
  getPdfDownload: vi.fn(),
}));

describe("InfoClient Component", () => {
  const mockUseUserData = useUserData as jest.Mock;

  beforeEach(() => {
    mockUseUserData.mockReturnValue({
      numberClient: "12345",
      userSelected: [
        { id: "1", referenceMonth: "Janeiro", documents: [{ id: "doc1" }] },
        { id: "2", referenceMonth: "Fevereiro", documents: [{ id: "doc2" }] },
      ],
      handleUserDataById: vi.fn(),
    });
  });

  test("should render the component correctly", () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    expect(screen.getByText("Número do Cliente")).toBeInTheDocument();
    expect(screen.getByText("Nº DO CLIENTE: 12345")).toBeInTheDocument();
    expect(screen.getByText("Boletos")).toBeInTheDocument();
    expect(screen.getByText("Janeiro")).toBeInTheDocument();
    expect(screen.getByText("Fevereiro")).toBeInTheDocument();
  });

  test("should call handleUserDataById on mount", () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    expect(mockUseUserData().handleUserDataById).toHaveBeenCalled();
  });

  test("should call getPdfDownload when download button is clicked", () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    const downloadButtons = screen.getAllByText("Download");
    fireEvent.click(downloadButtons[0]);

    expect(getPdfDownload).toHaveBeenCalledWith("doc1");
  });

  test('should render the "Voltar ao menu" link', () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", { name: /Voltar ao menu/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
