import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  Calendar,
  FlaskConical,
  Landmark,
  Microscope,
  Sigma,
} from "lucide-react";

export type StudyNodeData = {
  label: string;
  summary: string;
  index: number;
  isActive?: boolean;
  isSelected?: boolean;
};

const nodeColorClass = [
  "bg-node-1",
  "bg-node-2",
  "bg-node-3",
  "bg-node-4",
  "bg-node-5",
  "bg-node-6",
  "bg-node-7",
];

const iconByIndex = [Brain, BookOpen, Microscope, Landmark, Sigma, Calendar, FlaskConical];

function StudyNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as StudyNodeData;
  const Icon = iconByIndex[nodeData.index % 7] ?? Brain;
  const colorClass = nodeColorClass[nodeData.index % 7] ?? "bg-node-1";
  const isHighlighted = nodeData.isActive || nodeData.isSelected || selected;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-border !border-none opacity-0"
      />
      <div
        className={cn(
          "w-[200px] rounded-[16px] border border-border/60",
          "bg-card/80 backdrop-blur-xl px-3 py-3",
          "shadow-soft transition-all duration-200",
          "hover:shadow-elev hover:border-border",
          isHighlighted && "ring-2 ring-primary/50 shadow-elev border-primary/30"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              "ring-1 ring-border/60",
              colorClass
            )}
          >
            <Icon className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">
              {nodeData.label}
            </div>
            <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {nodeData.summary}
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-border !border-none opacity-0"
      />
    </>
  );
}

export const StudyNode = memo(StudyNodeComponent);
