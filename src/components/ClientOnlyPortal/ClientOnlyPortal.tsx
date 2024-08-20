import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IClientOnlyPortal {
  children: ReactNode;
  selector: string;
}

export default function ClientOnlyPortal({
  children,
  selector,
}: IClientOnlyPortal) {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
