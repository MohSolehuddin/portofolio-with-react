import { getCountOngoingProject } from "@/app/axios/features/project";
import { useEffect, useState } from "react";
import ProgressStat from "../stats/ProgressStat";

export default function ProjectOngoing() {
  const [ongoingProjects, setOngoingProjects] = useState(0);

  useEffect(() => {
    const getTotalOngoingProjects = async () => {
      try {
        const response = await getCountOngoingProject();
        setOngoingProjects(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getTotalOngoingProjects();
  });
  return <ProgressStat value={ongoingProjects} text="Project Ongoing" />;
}
