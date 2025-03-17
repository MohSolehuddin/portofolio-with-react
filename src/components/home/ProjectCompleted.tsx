import { getCountCompletedProject } from "@/app/axios/features/project";
import { useEffect, useState } from "react";
import ProgressStat from "../stats/ProgressStat";

export default function ProjectCompleted() {
  const [completedProjects, setCompletedProjects] = useState(0);

  useEffect(() => {
    const completedProjects = async () => {
      try {
        const response = await getCountCompletedProject();
        setCompletedProjects(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    completedProjects();
  });
  return <ProgressStat value={completedProjects} text="Project Completed" />;
}
