import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ITrack {
  title: string;
  description: string;
  icon: string;
  progress: number; // 0-100
  color: string; // color for the progress bar
}

export default function Tracks() {
  const tracks: ITrack[] = [
    {
      title: "HTML Foundations",
      description: "The backbone of the web.",
      icon: "HTML",
      progress: 70,
      color: "bg-orange-500",
    },
    {
      title: "CSS Masterclass",
      description: "Visual design & layouts.",
      icon: "CSS",
      progress: 50,
      color: "bg-blue-500",
    },
    {
      title: "JS Logic",
      description: "Dynamic programming.",
      icon: "JS",
      progress: 35,
      color: "bg-yellow-600",
    },
    {
      title: "React Framework",
      description: "Scalable modern UIs.",
      icon: "React",
      progress: 45,
      color: "bg-teal-500",
    },


    
  ];

  return (
    <div>
      <h1 className="text-4xl text-muted-foreground font-bold   lg:text-5xl lg:pl-11 md:pl-5 pl-5">
        Lering Tracking
      </h1>
      <section className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto ">
        {tracks.map((track, index) => (
          
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center gap-3 mb-4">
              <div className="h-8 w-11  rounded-md bg-gray-700 flex items-center justify-center text-white font-bold">
                {track.icon}
              </div>
              <CardTitle className="text-base">{track.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-sm">
                {track.description}
              </p>
              <div className="h-2 w-full bg-gray-700 rounded-full">
                <div
                  className={`${track.color} h-2 rounded-full`}
                  style={{ width: `${track.progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
