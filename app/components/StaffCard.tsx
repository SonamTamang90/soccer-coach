import React from "react";
import Image from "next/image";

interface StaffCardProps {
  name: string;
  role: string;
  imageUrl: string;
  nationality: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  imageUrl,
  nationality,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-full border"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {name}
      </h3>
      <p className="text-primary font-medium text-center">{role}</p>
      <p className="text-sm text-gray-600 text-center mt-1">{nationality}</p>
    </div>
  );
};

export default StaffCard;
