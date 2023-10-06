import { ReactNode } from "react";

interface CardProps {
  className?: string;
  size?: "small" | "regular";
  children: ReactNode;
}

export default function Card({
  children,
  size = "regular",
  className = "",
}: CardProps) {
  const cardSize = {
    small: "p-2 rounded-xl",
    regular: "p-6 rounded-2x",
  };

  return (
    <div
      className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white ${cardSize[size]} text-left align-middle shadow-xl transition-all relative ${className}`}
    >
      {children}
    </div>
  );
}
