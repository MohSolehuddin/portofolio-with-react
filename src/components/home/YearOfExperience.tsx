import { DATE_OF_STARTING_LEARNING_CODING } from "@/lib/constants";
import { getExperience } from "@/lib/utils/getExperience";
import ProgressStat from "../stats/ProgressStat";

export default function YearOfExperience() {
  const { years } = getExperience(DATE_OF_STARTING_LEARNING_CODING);
  return <ProgressStat value={years} text="Years of Experience" />;
}
