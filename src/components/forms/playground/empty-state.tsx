import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col items-center justify-center p-8 h-[200px]">
        <p className="text-muted-foreground mb-4">No questions added yet</p>
        <Button onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Your First Question
        </Button>
      </Card>
    </motion.div>
  );
}
