import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

export const Dialog: React.FC<DialogProps> = ({ open: controlledOpen, onOpenChange, children }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild }) => {
  const { setOpen } = React.useContext(DialogContext);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onClick: handleClick,
    });
  }

  return (
    <button onClick={handleClick} type="button">
      {children}
    </button>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, className, showClose = true }) => {
  const { open, setOpen } = React.useContext(DialogContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  if (!mounted || !open) return null;

  const handleOverlayClick = () => {
    setOpen(false);
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-200" onClick={handleOverlayClick}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      {/* Content */}
      <div
        className={twMerge(
          "relative no-scrollbar z-50 max-h-[90vh] max-w-[90vw] overflow-auto animate-in zoom-in-95 slide-in-from-top-[2%] duration-200",
          className
        )}
        onClick={handleContentClick}
      >
        {children}
        {showClose && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white/70 transition-all hover:bg-black/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            type="button"
            aria-label="Close"
          >
            <IoClose className="h-5 w-5 cursor-pointer" />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);

export const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={twMerge("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);

export const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={twMerge("text-sm text-muted-foreground", className)} {...props} />
);
