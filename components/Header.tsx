import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

const Header = ({ title = "", className }: Props) => {
  return (
    <header className={cn("py-10 px-4 mb-12 text-center pt-40", className)}>
      <h2 className="text-4xl uppercase mx-auto max-w-2xl font-bold">
        {title}
      </h2>
    </header>
  );
};

export default Header;
