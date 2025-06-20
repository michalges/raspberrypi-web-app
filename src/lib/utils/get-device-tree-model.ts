import { execSync } from "child_process";

export function getDeviceTreeModel() {
    try {
        const deviceTreeModel = execSync("cat /proc/device-tree/model").toString().trim();
        return deviceTreeModel;
    } catch {
        return null;
    }
}
