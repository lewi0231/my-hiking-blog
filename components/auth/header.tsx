// @flow
type Props = { label: string };

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h2 className="text-3xl font-semibold">Auth</h2>
      <p>{label}</p>
    </div>
  );
};
