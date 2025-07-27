"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import Link from "next/link";
import { type Boards } from "../boards/page";

interface BoardListProps {
  initialData: Boards;
}

export default function BoardList({ initialData }: BoardListProps) {
  const { data: boards } = api.board.getAll.useQuery(undefined, {
    initialData,
  });

  return (
    <>
      {boards.map((board) => (
        <Button
          asChild
          key={board.id}
          variant="ghost"
          className="h-auto w-60 p-0"
        >
          <Link href={`/boards/${board.id}`}>
            <Card className="w-full transition-colors hover:bg-accent">
              <CardHeader>
                <CardTitle>{board.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </Button>
      ))}
    </>
  );
}
