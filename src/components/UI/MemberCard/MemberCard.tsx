import React from 'react';

const MemberCard: React.FC<{ member: ICastMember }> = ({ member }) => {
  return (
    <div className="relative bg-white shadow-md duration-300">
        <img
          src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
          alt={member.name}
          className="h-auto"
        />
        <div className="bottom-0 left-0 right-0 p-2">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-2">
            <p className="text-sm font-medium text-gray-800 truncate">{member.name}</p>
            <p className="text-xs text-gray-500 truncate">{member.character}</p>
          </div>
        </div>
    </div>
  );
};

export default MemberCard;
