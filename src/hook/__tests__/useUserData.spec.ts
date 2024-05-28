import { describe, it, expect } from "vitest";
import { LuminiProvider, useUserData } from "../useUserData";
import { renderHook } from "@testing-library/react";

describe("useUserData", () => {
  it("should return users context", () => {
    const { result } = renderHook(() => useUserData(), {
      wrapper: LuminiProvider,
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.setUsers).toBeInstanceOf(Function);
    expect(result.current.handleGetUsers).toBeInstanceOf(Function);
  });

  it("should return userSelected context", () => {
    const { result } = renderHook(() => useUserData(), {
      wrapper: LuminiProvider,
    });

    expect(result.current.userSelected).toEqual([]);
    expect(result.current.setUserSelected).toBeInstanceOf(Function);
    expect(result.current.handleUserDataById).toBeInstanceOf(Function);
  });

  it("should return numberClient context", () => {
    const { result } = renderHook(() => useUserData(), {
      wrapper: LuminiProvider,
    });

    expect(result.current.numberClient).toBe("");
    expect(result.current.setNumberClient).toBeInstanceOf(Function);
  });
});
