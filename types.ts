export enum DownloadStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export type VideoQuality = '1080p' | '720p' | '480p';

export type VideoFormat = 'MP4' | 'AVI' | 'MOV';

export type Platform = 'YouTube' | 'TikTok' | 'Facebook' | 'Instagram';