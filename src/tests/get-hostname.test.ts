import { getHostname } from "../../src/lib/utils/get-hostname";
import * as getIp from "../../src/lib/utils/get-ip";
import { describe, it, expect, vi } from "vitest";

describe("getHostname", () => {
    it("replaces digits in hostname parts except the last", () => {
        vi.spyOn(getIp, "getIp").mockReturnValue("192.168.1.101");

        const result = getHostname();

        expect(result).toBe("xxx.xxx.x.101");
    });

    it("handles IP in 172.16.x.x range", () => {
        vi.spyOn(getIp, "getIp").mockReturnValue("172.16.254.1");

        const result = getHostname();

        expect(result).toBe("xxx.xx.xxx.1");
    });

    it("handles IP in 10.x.x.x range", () => {
        vi.spyOn(getIp, "getIp").mockReturnValue("10.20.30.40");

        const result = getHostname();

        expect(result).toBe("xx.xx.xx.40");
    });

    it("returns obfuscated unknown IP", () => {
        vi.spyOn(getIp, "getIp").mockReturnValue("8.8.8.8");

        const result = getHostname();

        expect(result).toBe("x.x.x.8");
    });
});
