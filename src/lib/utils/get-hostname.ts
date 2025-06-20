import { getIp } from "./get-ip";

export function getHostname() {
    let hostname: string = getIp();

    console.log(hostname);

    const parts = hostname.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
        parts[i] = parts[i].replace(/\d/g, "x");
    }
    hostname = parts.join(".");

    return hostname;
}
