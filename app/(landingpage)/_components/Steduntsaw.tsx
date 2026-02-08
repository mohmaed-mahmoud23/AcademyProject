import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Studentsay(){


const studentsSay = [
  {
    id: 1,
    name: "Ahmed Ali",
    role: "Frontend Developer",
    message: "The course was amazing and helped me a lot!",
  },
  {
    id: 2,
    name: "Mariam Saad",
    role: "UI/UX Designer",
    message: "Great experience, highly recommended.",
  },
  {
    id: 3,
    name: "Omar Hassan",
    role: "Full Stack Developer",
    message: "Learned so much in a short time!",
  },
  {
    id: 4,
    name: "Sara Khaled",
    role: "Software Engineer",
    message: "The instructors were very professional.",
  },
];


    return (
      <div>
        <h1 className="text-4xl text-muted-foreground font-bold   lg:text-5xl lg:pl-11 md:pl-5 pl-5">
          students Says
        </h1>
        <section className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto">
          {studentsSay.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <CardTitle>{student.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{student.role}</p>
              </CardHeader>
              <CardContent>
                <p className="italic">{student.message}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    );
}