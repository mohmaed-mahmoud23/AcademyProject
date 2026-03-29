
import Getauthme from "./(groub)/authmy/UseGetauthme";
import StudentDashboard from "./(groub)/dashboardstudent/StudentDashboard";
export default function pagesindex(){
  return (
    <div>
      <Getauthme />
      <StudentDashboard/>
    </div>
  );
}