
import React from 'react';
import { DownloadStatus } from '../types';
import SpinnerIcon from './icons/SpinnerIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';

interface StatusDisplayProps {
  status: DownloadStatus;
  message: string;
  downloadLink: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, message, downloadLink }) => {
  if (status === DownloadStatus.Idle) {
    return null;
  }

  const getStatusContent = () => {
    switch (status) {
      case DownloadStatus.Loading:
        return (
          <div className="flex items-center gap-3 text-yellow-400">
            <SpinnerIcon />
            <span>{message}</span>
          </div>
        );
      case DownloadStatus.Success:
        return (
          <div className="flex flex-col items-center gap-3 text-green-400">
            <div className="flex items-center gap-3">
              <CheckCircleIcon />
              <span>{message}</span>
            </div>
            {downloadLink && (
              <a
                href={downloadLink}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Click to Download
              </a>
            )}
          </div>
        );
      case DownloadStatus.Error:
        return (
          <div className="flex items-center gap-3 text-red-400">
            <XCircleIcon />
            <span>{message}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center p-4 bg-gray-700/50 rounded-lg min-h-[60px]">
      {getStatusContent()}
    </div>
  );
};

export default StatusDisplay;
