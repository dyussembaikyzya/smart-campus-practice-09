import { describe, it, expect } from "vitest";
import { toMinutes, formatTime } from "@/time";

describe("toMinutes", () => {
  // Converts "HH:MM" into minutes since midnight: 10 * 60 + 30 = 630.
  it("converts a clock time to minutes", () => {
    expect(toMinutes("10:30")).toBe(630);
  });

  // An empty time field must give NaN so canBook can reject it as missing input.
  it("returns NaN for an empty string", () => {
    expect(toMinutes("")).toBeNaN();
  });
});

describe("formatTime", () => {
  // 630 minutes is 10:30, padded to two digits per part.
  it("formats minutes as a clock time", () => {
    expect(formatTime(630)).toBe("10:30");
  });

  // Midnight must render with zero padding, not as "0:0".
  it("formats midnight as 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });
});
