import { describe, it, expect } from "vitest";
import { canBook, type Booking } from "@/canBook";

const NOW = 540; // 09:00
const EXISTING: Booking[] = [[600, 660]]; // 10:00–11:00

describe("canBook", () => {
  // AC1: a start time equal to the current time is in the past, so it is rejected.
  it("rejects a start exactly at now (540–570)", () => {
    const result = canBook(540, 570, NOW, false, EXISTING);
    expect(result.available).toBe(false);
  });

  // AC1: a start one minute after now is in the future, so it is accepted.
  it("accepts a start one minute after now (541–600)", () => {
    const result = canBook(541, 600, NOW, false, EXISTING);
    expect(result.available).toBe(true);
  });

  // AC1: an end before the start is an invalid range, so it is rejected.
  it("rejects a reversed interval (720–700)", () => {
    const result = canBook(720, 700, NOW, false, EXISTING);
    expect(result.available).toBe(false);
  });

  // AC1/AC6: a missing time becomes NaN, which must give the specific entry message.
  it("rejects empty input (NaN end) with the entry message", () => {
    const result = canBook(720, NaN, NOW, false, EXISTING);
    expect(result).toEqual({
      available: false,
      message: "Please enter both start and end time.",
    });
  });

  // AC2: exactly 120 minutes is the allowed maximum, so it is accepted.
  it("accepts exactly 120 minutes (720–840)", () => {
    const result = canBook(720, 840, NOW, false, EXISTING);
    expect(result.available).toBe(true);
  });

  // AC2: 121 minutes exceeds the 120-minute cap, so it is rejected.
  it("rejects 121 minutes (720–841)", () => {
    const result = canBook(720, 841, NOW, false, EXISTING);
    expect(result.available).toBe(false);
  });

  // AC3: a blocked room is rejected regardless of the requested time.
  it("rejects a blocked room (660–720 with blocked = true)", () => {
    const result = canBook(660, 720, NOW, true, EXISTING);
    expect(result.available).toBe(false);
  });

  // AC4: 630–690 overlaps the existing 600–660 booking, so it is rejected.
  it("rejects an overlap with an existing booking (630–690)", () => {
    const result = canBook(630, 690, NOW, false, EXISTING);
    expect(result.available).toBe(false);
  });

  // AC4: 660–720 only touches the existing booking's end, which is allowed.
  it("accepts a booking that touches an existing endpoint (660–720)", () => {
    const result = canBook(660, 720, NOW, false, EXISTING);
    expect(result.available).toBe(true);
  });

  // AC5: canBook must not modify the bookings it is given.
  it("leaves the existing bookings unchanged", () => {
    const before = structuredClone(EXISTING);
    canBook(630, 690, NOW, false, EXISTING);
    canBook(660, 720, NOW, false, EXISTING);
    expect(EXISTING).toEqual(before);
  });
});
