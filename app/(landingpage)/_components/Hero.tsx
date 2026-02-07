import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Hero(){
    return(
        <div>



             <section className="relative  py-20">
        <div className="flex flex-col items-center text-center   space-y-8">
          <Badge variant="destructive">The Futher Online Eduction</Badge>
    
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight ">
            Elvate your Learing Exprince
          </h1>
          <p className=" max-w-[700px] text-muted-foreground md:text-xl text-center">
            Discver a new wy to lern with our modern, interctive learing
            mangement system. Acces high-quilate courses anytime antway.
          </p>

          <div className="flex flex-col  sm:flex-row gap-4 mt-8">
            <Link
              href={"/courses"}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explor Courses
            </Link>
            <Link
              href={"/login"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Sing in
            </Link>
          </div>
        </div>
      </section>
        </div>
    )
}