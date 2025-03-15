import axios from "axios";
import { useEffect, useState } from "react";
import ProgressStat from "../stats/ProgressStat";

export default function ProjectOngoing() {
  const [ongoingProjects, setOngoingProjects] = useState(0);

  useEffect(() => {
    const getTotalOngoingProjects = async () => {
      try {
        const response = await axios.get("/api/v1/projects/ongoing");
        setOngoingProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getTotalOngoingProjects();
  });
  return <ProgressStat value={ongoingProjects} text="Project Ongoing" />;
}
