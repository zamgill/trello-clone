"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";
import { EllipsisIcon, MinusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButton({ boardId }: { boardId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate: deleteBoard } = api.board.delete.useMutation({
    onSuccess: async () => {
      await utils.board.invalidate();
      router.push("/boards");
    },
  });

  function handleCloseBoard() {
    setOpen(false);
    deleteBoard({ boardId });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-48">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <MinusIcon />
              Close board
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <Card className="border-none shadow-none">
              <CardHeader className="flex-row justify-between p-1 text-center">
                <CardTitle className="flex-1 self-center">
                  Close board?
                </CardTitle>
                <CardAction className="justify-self-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="-mt-1"
                  >
                    <XIcon />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="p-2 pb-4">
                You can find and reopen closed boards at the bottom of your
                boards page.
              </CardContent>
              <CardAction className="w-full justify-self-center">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleCloseBoard}
                >
                  Close
                </Button>
              </CardAction>
            </Card>
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
