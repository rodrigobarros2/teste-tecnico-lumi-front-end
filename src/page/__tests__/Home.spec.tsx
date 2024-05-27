import { vi } from "vitest";
import { Home } from "../Home";
import { BrowserRouter } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";
import { extractPDF, fetchUser, uploadPdf } from "../../modules/users";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../../hook/useUserData", () => ({
  useUserData: vi.fn(),
}));

vi.mock("../../modules/users", () => ({
  extractPDF: vi.fn(),
  fetchUser: vi.fn(),
  uploadPdf: vi.fn(),
}));

describe("Home Component", () => {
  const mockUseUserData = useUserData as jest.Mock;

  beforeEach(() => {
    mockUseUserData.mockReturnValue({
      users: ["12345", "67890"],
      setUsers: vi.fn(),
      handleUserDataById: vi.fn(),
      userSelected: [],
      numberClient: "12345",
      handleGetUsers: vi.fn(),
    });

    (fetchUser as jest.Mock).mockResolvedValue(["12345", "67890"]);
    (extractPDF as jest.Mock).mockResolvedValue({ id: "pdfId", customerNumber: "12345" });
  });

  test("should render the component correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Arquivo")).toBeInTheDocument();
    expect(screen.getByText("Escolha o PDF a ser enviado")).toBeInTheDocument();
    expect(screen.getByText("Filtrar por número do cliente")).toBeInTheDocument();
    expect(screen.getByText("Lista de números de clientes")).toBeInTheDocument();
    expect(screen.getByText("Nº DO CLIENTE: 12345")).toBeInTheDocument();
    expect(screen.getByText("Nº DO CLIENTE: 67890")).toBeInTheDocument();
  });

  test("should fetch users on mount", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => expect(fetchUser).toHaveBeenCalled());
    expect(mockUseUserData().setUsers).toHaveBeenCalledWith(["12345", "67890"]);
  });

  test("should call extractPDF and uploadPdf on form submit", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const file = new File(["dummy content"], "boleto.pdf", { type: "application/pdf" });
    const input = screen.getByLabelText("Escolha o PDF a ser enviado");
    const form = screen.getByRole("form");

    await waitFor(() => fireEvent.change(input, { target: { files: [file] } }));
    fireEvent.submit(form);

    await waitFor(() => expect(extractPDF).toHaveBeenCalledWith(file));
    await waitFor(() => expect(uploadPdf).toHaveBeenCalledWith(file, "pdfId"));
    expect(mockUseUserData().handleUserDataById).toHaveBeenCalledWith("12345");
    expect(mockUseUserData().handleGetUsers).toHaveBeenCalled();
  });

  test("should filter users based on input", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Filtrar Nº do cliente");
    fireEvent.change(input, { target: { value: "123" } });

    expect(screen.queryByText("Nº DO CLIENTE: 67890")).not.toBeInTheDocument();
    expect(screen.getByText("Nº DO CLIENTE: 12345")).toBeInTheDocument();
  });

  test('should render the "Ver informações dos clientes" link', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("button", { name: /Ver informações dos clientes/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/user?filter=12345");
  });
});
