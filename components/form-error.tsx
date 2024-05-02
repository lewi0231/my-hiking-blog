import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {
  message?: string;
};

export const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-4 gap-2 rounded-md flex items-center text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
