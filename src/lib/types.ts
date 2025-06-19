export interface SystemStats {
    cpu_load: number;
    temperature: number;
    ram_used: number;
    ram_total: number;
    storage_used: number;
    storage_total: number;
}

export interface CpuStats {
    cpu_load: number;
    cpu_cores: {
        core_id: number;
        usage: number;
    }[];
}
