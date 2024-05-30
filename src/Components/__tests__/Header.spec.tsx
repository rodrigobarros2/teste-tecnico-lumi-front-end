import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import Logo from "../../assets/logo.svg";

test("Should render header component with correct text and styles", () => {
  render(<Header />);

  const headerElement = screen.getByRole("banner");
  expect(headerElement).toHaveClass("bg-green-950");
  expect(headerElement).toHaveClass("text-white");
  expect(headerElement).toHaveClass("py-6");
  expect(headerElement).toHaveClass("px-6");

  const containerElement = headerElement.firstChild;
  expect(containerElement).toHaveClass("container");
  expect(containerElement).toHaveClass("mx-auto");
  expect(containerElement).toHaveClass("flex");
  expect(containerElement).toHaveClass("justify-between");
  expect(containerElement).toHaveClass("items-center");

  const logoElement = screen.getByAltText("Logo");
  expect(logoElement).toBeInTheDocument();
  expect(logoElement).toHaveClass("w-20");
  expect(logoElement).toHaveAttribute("src", Logo);
});
