import React from 'react';

interface VideoPlayerAreaProps {
  videoUrls: string[];
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const VideoPlayerArea: React.FC<VideoPlayerAreaProps> = ({ videoUrls }) => {
  if (videoUrls.length === 0) return null;

  // For now, we'll just show the first video or a simple list if multiple
  const firstVideoId = getYoutubeId(videoUrls[0]);

  if (!firstVideoId) return null;

  return (
    <div className="relative w-full aspect-video bg-black comic-border overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
      <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none z-10" />
      
      <iframe
        src={`https://www.youtube.com/embed/${firstVideoId}?mute=1&loop=1&playlist=${firstVideoId}&controls=1&showinfo=0&rel=0&modestbranding=1`}
        className="w-full h-full border-none relative z-0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Featured Video"
      />
      
      {videoUrls.length > 1 && (
        <div className="absolute top-2 right-2 z-20 bg-black/80 border border-white p-1 text-[10px] font-display text-white italic">
          {videoUrls.length} VIDEOS
        </div>
      )}
    </div>
  );
};
