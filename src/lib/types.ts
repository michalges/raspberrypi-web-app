export interface SystemStats {
    cpuLoad: number;
    temperature: number;
    ramUsed: number;
    ramTotal: number;
    storageUsed: number;
    storageTotal: number;
}

export interface CpuStats {
    cpuLoad: number;
    cpuCores: {
        coreId: number;
        usage: number;
    }[];
    time: number;
}

export interface TempStats {
    temperature: number;
    time: number;
}

export interface RamStats {
    ramUsed: number;
    ramTotal: number;
    time: number;
}

export interface StorageStats {
    storageUsed: number;
    storageTotal: number;
    time: number;
}
