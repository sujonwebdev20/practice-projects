const Footer = () => {
  return (
    <footer className="flex items-center justify-center px-4 w-full bg-zinc-50 h-[3rem]">
      <strong>&copy;</strong> Copyright {new Date().getFullYear()} | All rights
      reserved By &nbsp;
      <a href="#">
        <strong>
          <em className="text-primary">MD. SUJON HOSSEN</em>
        </strong>
      </a>
      ❤️
    </footer>
  );
};

export default Footer;
