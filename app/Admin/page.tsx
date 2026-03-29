import { SectionCards } from "../../components/section-cards";
// import { TopStudents } from "@/components/Topstudents";
// import { TopTracks } from "@/components/Toptracks";
import { RecentUsers } from "@/components/Recent-users";
import { TopStudentsLeaderboard } from "@/components/Students-chart";

export default function AdmindashbordIndex() {
  return (
    <>
      <SectionCards />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* <TopStudents /> */}
      <TopStudentsLeaderboard />
        {/* <TopTracks /> */}
      </div>
      <RecentUsers />
    </> 
  );
}
