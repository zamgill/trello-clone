"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  boardTitle: z.string().min(2).max(50),
});

function NewBoardForm({ onSuccess }: { onSuccess: () => void }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardTitle: "",
    },
  });

  const utils = api.useUtils();
  const createBoard = api.board.add.useMutation({
    onSuccess: async () => {
      await utils.board.invalidate();
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createBoard.mutateAsync(values);
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="boardTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>👋 Board title is required</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function CreateBoardButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-60">
        <Button variant="ghost" className="h-auto rounded-xl p-0">
          <Card className="w-full bg-accent/60 opacity-80 transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>Create a new board</CardTitle>
            </CardHeader>
          </Card>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
        </DialogHeader>
        <NewBoardForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
