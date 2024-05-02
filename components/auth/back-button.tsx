"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: Props) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
