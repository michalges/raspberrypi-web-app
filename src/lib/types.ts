export interface SystemStats {
    cpuUsage: number;
    temperature: number;
    ramUsed: number;
    ramTotal: number;
    storageUsed: number;
    storageTotal: number;
}

export interface CpuStats {
    timestamp: number;
    cpuUsage: number;
}

export interface TempStats {
    timestamp: number;
    temp: number;
}

export interface RamStats {
    timestamp: number;
    ramUsage: number;
    ramTotal: number;
    ramAvailable: number;
    ramPercentUsed: number;
    ramUnit: string;
}

export interface StorageStats {
    timestamp: number;
    storageUsed: number;
    storageTotal: number;
    storageAvailable: number;
    storagePercentUsed: number;
    storageUnit: string;
}

export interface DeviceInfo {
    revision: string | null;
    model: string;
}

export interface ChartData {
    timestamp: number;
    value: number;
}
