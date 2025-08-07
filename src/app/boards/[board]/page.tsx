import ActionButton from "@/app/_components/action-button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  // return <div>Board {board}</div>;
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Board {board}</CardTitle>
        <CardAction className="!mt-0">
          <ActionButton boardId={board} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
