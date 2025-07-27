import { type RouterOutputs } from "@/trpc/react";
import { api, HydrateClient } from "@/trpc/server";
import BoardList from "../_components/board-list";
import CreateBoardButton from "../_components/create-board-button";

export type Boards = RouterOutputs["board"]["getAll"];
export default async function BoardsPage() {
  const boards = await api.board.getAll();
  return (
    <HydrateClient>
      <div className="flex flex-wrap gap-2">
        <BoardList initialData={boards} />
        <CreateBoardButton />
      </div>
    </HydrateClient>
  );
}
