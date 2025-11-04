
import React, { useState, useCallback, useEffect } from 'react';
import { DownloadStatus, VideoQuality, Platform, VideoFormat } from './types';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import StatusDisplay from './components/StatusDisplay';

// Define the supported platforms and their regex for validation
const supportedPlatforms = {
  YouTube: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w-]{11})/,
  TikTok: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/.*\/video\//,
  Facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:.*\/videos\/|watch\/?\?v=)(\d+)/,
  Instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/,
};

// Define regex for supported domains to give more specific errors
const supportedDomains = {
  YouTube: /youtube\.com|youtu\.be/,
  TikTok: /tiktok\.com/,
  Facebook: /facebook\.com/,
  Instagram: /instagram\.com/,
};


interface ValidationResult {
  isValid: boolean;
  platform: Platform | null;
  error: string | null;
}

/**
 * Validates a URL against a list of supported platforms with specific error feedback.
 * @param url The URL string to validate.
 * @returns A ValidationResult object.
 */
const validateUrlAndGetPlatform = (url: string): ValidationResult => {
  // 1. Basic URL format check
  try {
    new URL(url);
  } catch (_) {
    return { isValid: false, platform: null, error: 'Invalid URL format. Please check and try again.' };
  }

  // 2. Check for a valid video URL pattern directly
  for (const [platform, regex] of Object.entries(supportedPlatforms)) {
    if (regex.test(url)) {
      return { isValid: true, platform: platform as Platform, error: null };
    }
  }

  // 3. If no video pattern matches, check if it's a link from a known domain but not a video link
  for (const [platform, domainRegex] of Object.entries(supportedDomains)) {
    if (domainRegex.test(url)) {
      return {
        isValid: false,
        platform: null,
        error: `This looks like a ${platform} link, but not a valid video URL. Please provide a direct link to a video.`
      };
    }
  }

  // 4. If it's not from a known domain, it's an unsupported platform
  return {
    isValid: false,
    platform: null,
    error: 'Unsupported platform. Please use a link from YouTube, TikTok, Facebook, or Instagram.'
  };
};

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.Idle);
  const [message, setMessage] = useState<string>('');
  const [downloadLink, setDownloadLink] = useState<string>('');
  const [quality, setQuality] = useState<VideoQuality>('720p');
  const [format, setFormat] = useState<VideoFormat>('MP4');
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);

  // Effect to detect platform as user types for instant UI feedback
  useEffect(() => {
    if (url.trim() === '') {
      setDetectedPlatform(null);
      // Reset status if user clears input while not in a loading state
      if (status !== DownloadStatus.Idle && status !== DownloadStatus.Loading) {
        setStatus(DownloadStatus.Idle);
        setMessage('');
      }
      return;
    }

    const validation = validateUrlAndGetPlatform(url);
    setDetectedPlatform(validation.platform);
    
    // Clear previous error message on valid input
    if (validation.isValid && status === DownloadStatus.Error) {
        setStatus(DownloadStatus.Idle);
        setMessage('');
    }
  }, [url, status]);


  const handleDownload = useCallback(async () => {
    const validation = validateUrlAndGetPlatform(url);

    if (!validation.isValid) {
      setStatus(DownloadStatus.Error);
      setMessage(validation.error!);
      setDownloadLink('');
      return;
    }

    setStatus(DownloadStatus.Loading);
    setMessage(`Analyzing link from ${validation.platform}...`);
    setDownloadLink('');

    // Simulate API call and processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessage(`Fetching ${quality} video data as ${format}...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success or failure
    const isSuccess = Math.random() > 0.2; // 80% success rate

    if (isSuccess) {
      setStatus(DownloadStatus.Success);
      setMessage('Your download is ready!');
      // This is a placeholder link. In a real app, this would be the link from the backend.
      setDownloadLink('https://picsum.photos/1920/1080');
    } else {
      setStatus(DownloadStatus.Error);
      setMessage(`Failed to download from ${validation.platform}. The link may be private or broken.`);
      setDownloadLink('');
    }
  }, [url, quality, format]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <Header />
        <main className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8">
          <UrlInput
            url={url}
            setUrl={setUrl}
            onDownload={handleDownload}
            isLoading={status === DownloadStatus.Loading}
            quality={quality}
            setQuality={setQuality}
            format={format}
            setFormat={setFormat}
            detectedPlatform={detectedPlatform}
          />
          <StatusDisplay
            status={status}
            message={message}
            downloadLink={downloadLink}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
