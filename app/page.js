import Image from "next/image";
import ResumeUploader from "./components/ResumeUploader";
import DiversityCard from "./components/Diversity";
import StorytellingPromptsCard from "./components/Storytelling";  
import UnityCard from "./components/Unity";
import ChallengeCard from "./components/Challenge";
export default function Home() {
  return (
    <div> 
      
      <ResumeUploader />
      <DiversityCard />
      <StorytellingPromptsCard />
      <ChallengeCard />
      <UnityCard />

    </div>
  );
}
