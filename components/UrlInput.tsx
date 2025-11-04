
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import { VideoQuality, Platform, VideoFormat } from '../types';
import YouTubeIcon from './icons/YouTubeIcon';
import TikTokIcon from './icons/TikTokIcon';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onDownload: () => void;
  isLoading: boolean;
  quality: VideoQuality;
  setQuality: (quality: VideoQuality) => void;
  format: VideoFormat;
  setFormat: (format: VideoFormat) => void;
  detectedPlatform: Platform | null;
}

const PlatformIcon: React.FC<{ platform: Platform | null }> = ({ platform }) => {
  if (!platform) return null;
  
  let icon;
  switch (platform) {
    case 'YouTube': icon = <YouTubeIcon />; break;
    case 'TikTok': icon = <TikTokIcon />; break;
    case 'Facebook': icon = <FacebookIcon />; break;
    case 'Instagram': icon = <InstagramIcon />; break;
    default: return null;
  }
  
  return (
      <div className="transition-opacity duration-300 ease-in-out">
        {icon}
      </div>
  );
};


const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, onDownload, isLoading, quality, setQuality, format, setFormat, detectedPlatform }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onDownload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url-input" className="sr-only">Video URL</label>
        <div className="relative flex items-center">
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video URL here..."
              className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400 pr-12"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <PlatformIcon platform={detectedPlatform} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quality-select" className="block text-sm font-medium text-gray-300 mb-2">Select Quality</label>
          <select
            id="quality-select"
            value={quality}
            onChange={(e) => setQuality(e.target.value as VideoQuality)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-white"
          >
            <option value="1080p">1080p (Full HD)</option>
            <option value="720p">720p (HD)</option>
            <option value="480p">480p (Standard)</option>
          </select>
        </div>
        <div>
          <label htmlFor="format-select" className="block text-sm font-medium text-gray-300 mb-2">Select Format</label>
          <select
            id="format-select"
            value={format}
            onChange={(e) => setFormat(e.target.value as VideoFormat)}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors text-white"
          >
            <option value="MP4">MP4 (Recommended)</option>
            <option value="AVI">AVI (Compatibility)</option>
            <option value="MOV">MOV (Apple Devices)</option>
          </select>
        </div>
      </div>


      <button
        type="submit"
        disabled={isLoading || !url}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <SpinnerIcon />
            Processing...
          </>
        ) : (
          <>
            <DownloadIcon />
            Download Video
          </>
        )}
      </button>
    </form>
  );
};

export default UrlInput;