import type { StudySummary } from "@/context/StudyContext";
import { useStudy } from "@/context/StudyContext";
import { NodeCanvas } from "@/components/nodoia/NodeCanvas";

export function NodeMap({ summary }: { summary: StudySummary }) {
  const { activeNodeId } = useStudy();
  return <NodeCanvas summary={summary} externalActiveId={activeNodeId} />;
}
