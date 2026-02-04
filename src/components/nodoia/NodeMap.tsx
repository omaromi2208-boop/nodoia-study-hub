import type { StudySummary } from "@/context/StudyContext";
import { useStudy } from "@/context/StudyContext";
import { ReactFlowCanvas } from "@/components/neuroflow/ReactFlowCanvas";

export function NodeMap({ summary }: { summary: StudySummary }) {
  const { activeNodeId } = useStudy();
  return <ReactFlowCanvas summary={summary} externalActiveId={activeNodeId} />;
}
