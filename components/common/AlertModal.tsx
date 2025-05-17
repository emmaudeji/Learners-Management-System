"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AlertModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const msg = searchParams.get("msg");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (msg) setIsOpen(true);
  }, [msg]);

  const handleClose = () => {
    setIsOpen(false);
    router.replace("/courses"); // Cleans up ?msg from the URL
  };

  if (!msg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Heads up 👋</DialogTitle>
          <DialogDescription>{msg}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Dismiss
          </Button>
          <Button onClick={() => router.push("/courses")}>
            Browse Courses
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
