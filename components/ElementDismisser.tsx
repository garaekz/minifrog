import { Ref, useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

export default function ElementDismisser({ children, isOpen, setIsOpen }: { children: JSX.Element, isOpen: boolean, setIsOpen: (value: boolean) => void }) {
  const wrapperRef: Ref<HTMLDivElement> = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (wrapperRef.current && !event.composedPath().includes(wrapperRef.current) && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, isOpen, setIsOpen]);

  return <div ref={wrapperRef}>{children}</div>;
}