import axios from "axios";
import { vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { fetchUser, getPdfDownload } from "../users";

const mock = new MockAdapter(axios);

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("User module", () => {
  afterEach(() => {
    mock.reset();
    vi.clearAllMocks();
  });

  test("should open PDF in new window for getPdfDownload", () => {
    global.open = vi.fn();
    getPdfDownload("123");
    expect(global.open).toHaveBeenCalledWith(`${import.meta.env.VITE_REACT_API_URL}/download/123`);
  });
});
