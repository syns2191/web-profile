import React from 'react';
import Image from 'next/image';

interface GithubActivityGraphProps {
  username: string;
}

export const GithubActivityGraph = ({ username }: GithubActivityGraphProps) => {
  console.log('usernae', username)
  return (
    <div className="flex justify-center items-center py-8">
      <Image
        src={`https://ghchart.rshah.org/${username}`}
        alt={`${username}'s GitHub Contributions Graph`}
        width={700} // Approximate width, adjust as needed
        height={300} // Approximate height, adjust as needed
        className="w-full max-w-3xl rounded-lg shadow-lg"
        unoptimized
      />
    </div>
  );
};
