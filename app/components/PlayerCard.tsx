import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PlayerCardProps {
  id: number;
  name: string;
  position: string;
  number: number;
  imageUrl: string;
  age: number;
  nationality: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  id,
  name,
  position,
  number,
  imageUrl,
  age,
  nationality,
}) => {
  return (
    <Link href={`/dashboard/team/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative h-64 w-full">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {number}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-primary font-medium">{position}</p>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <p>Age: {age}</p>
            <p>Nationality: {nationality}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
