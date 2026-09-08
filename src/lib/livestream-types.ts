export interface LivestreamConfig {
  channelALive: boolean;
  channelBLive: boolean;
  radioLogoUrl: string | null;
  radioLogoStoragePath: string | null;
  stationName?: string;
  nowBroadcastingTitle?: string;
}
