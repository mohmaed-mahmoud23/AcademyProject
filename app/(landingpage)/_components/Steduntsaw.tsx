import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Studentsay() {
  const studentsSay = [
    {
      id: 1,
      name: "Ahmed Ali",
      role: "Frontend Developer",
      message: "The course was amazing and helped me a lot!",
      avatar: "/Image.png",
    },
    {
      id: 2,
      name: "Mariam Saad",
      role: "UI/UX Designer",
      message: "Great experience, highly recommended.",
      avatar: "/Image.png",
    },
    {
      id: 3,
      name: "Omar Hassan",
      role: "Full Stack Developer",
      message: "Learned so much in a short time!",
      avatar: "/Image.png",
    },
    {
      id: 4,
      name: "Sara Khaled",
      role: "Software Engineer",
      message: "The instructors were very professional.",
      avatar: "/Image.png",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl text-muted-foreground font-bold lg:text-5xl lg:pl-11 md:pl-5 pl-5 mb-8">
        Students Says
      </h1>

      <section className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto">
        {studentsSay.map((student) => (
          <Card
            key={student.id}
            className="border border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <CardHeader className="flex flex-col items-center gap-2">
              <Image
                src={student.avatar}
                alt={student.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
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
