import NavItem from "./NavItem";

export default function NavMenu() {
  return (
    <div className="flex items-center gap-8">
      <NavItem href="/" label="Home" />
      <NavItem href="/submit" label="Submit Project" />
    </div>
  );
}
