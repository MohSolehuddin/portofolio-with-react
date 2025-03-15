import axios from "axios";
import { useEffect, useState } from "react";
import ProgressStat from "../stats/ProgressStat";

export default function ProjectCompleted() {
  const [completedProjects, setCompletedProjects] = useState(0);

  useEffect(() => {
    const completedProjects = async () => {
      try {
        const response = await axios.get("/api/v1/projects/completed");
        setCompletedProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    completedProjects();
  });
  return <ProgressStat value={completedProjects} text="Project Completed" />;
}
