import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { InfoClient } from "..";
import { getPdfDownload } from "../../../modules/users";

jest.mock("../../../hook/useUserData", () => ({
  useUserData: jest.fn(() => ({
    numberClient: "123",
    userSelected: [
      {
        id: "1",
        referenceMonth: "JAN/2023",
        documents: [{ id: "document-id" }],
      },
      {
        id: "2",
        referenceMonth: "FEB/2023",
        documents: [{ id: "document-id" }],
      },
    ],
    handleUserDataById: jest.fn(),
  })),
}));

jest.mock("../../../modules/users", () => ({
  getPdfDownload: jest.fn(),
}));

describe("InfoClient", () => {
  test("renders InfoClient component with correct user data", () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    expect(screen.getByText(/Nº DO CLIENTE: 123/i)).toBeInTheDocument();
    expect(screen.getByText(/JAN\/2023/i)).toBeInTheDocument();
    expect(screen.getByText(/FEB\/2023/i)).toBeInTheDocument();
  });

  test("handles download button click", async () => {
    render(
      <BrowserRouter>
        <InfoClient />
      </BrowserRouter>
    );

    fireEvent.click(screen.getAllByText(/Download/i)[0]);

    await waitFor(() => {
      expect(getPdfDownload).toHaveBeenCalledWith("document-id");
    });
  });
});
