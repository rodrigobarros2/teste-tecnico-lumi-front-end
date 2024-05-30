import Logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <header className="bg-green-950 text-white py-6 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <img className="w-20" src={Logo} alt="Logo" />
        <div className="flex items-center space-x-4"></div>
      </div>
    </header>
  );
};
