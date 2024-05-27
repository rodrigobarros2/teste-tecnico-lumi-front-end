import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

test("Should be header component with correct text and styles", () => {
  render(<Header />);

  const titleElement = screen.getByText(/Dashboard/i);
  expect(titleElement).toBeInTheDocument();

  const headerElement = screen.getByRole("banner");
  expect(headerElement).toHaveClass("bg-green-950");

  expect(headerElement).toHaveClass("text-white");

  const containerElement = screen.getByRole("banner").firstChild;
  expect(containerElement).toHaveClass("container");
  expect(containerElement).toHaveClass("mx-auto");
  expect(containerElement).toHaveClass("flex");
  expect(containerElement).toHaveClass("justify-between");
  expect(containerElement).toHaveClass("items-center");

  const headingElement = screen.getByRole("heading");
  expect(headingElement).toHaveTextContent("Dashboard");
});
