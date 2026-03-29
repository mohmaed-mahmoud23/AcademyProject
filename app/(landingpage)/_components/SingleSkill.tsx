"use client";

interface SingleSkillProps {
  text: string;
  imgSvg: React.ReactNode;
}

const SingleSkill = ({ text, imgSvg }: SingleSkillProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg hover:scale-110 transition-transform duration-500 cursor-pointer">
      <div className="text-5xl mb-2">{imgSvg}</div>
      <span className="font-semibold text-gray-700">{text}</span>
    </div>
  );
};

export default SingleSkill;