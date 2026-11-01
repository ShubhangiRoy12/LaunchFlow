"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EMPTY_INPUT,
  LaunchBlueprint,
  LaunchInput,
  RenderRecord,
  STORAGE_KEYS,
  buildReferences,
} from "@/lib/launchflow";

export function useLaunchProject() {
  const [input, setInputState] = useState<LaunchInput>(EMPTY_INPUT);
  const [blueprint, setBlueprint] = useState<LaunchBlueprint | null>(null);
  const [renderRecord, setRenderRecord] = useState<RenderRecord | null>(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInputState(readStorage(STORAGE_KEYS.input, EMPTY_INPUT));
    setBlueprint(readStorage<LaunchBlueprint | null>(STORAGE_KEYS.blueprint, null));
    setRenderRecord(readStorage<RenderRecord | null>(STORAGE_KEYS.renders, null));
    setIsAdmin(readStorage(STORAGE_KEYS.admin, true));
    setReady(true);
  }, []);

  const setInput = (next: LaunchInput | ((current: LaunchInput) => LaunchInput)) => {
    setInputState((current) => {
      const value = typeof next === "function" ? next(current) : next;
      const withReferences = { ...value, references: buildReferences(value) };
      localStorage.setItem(STORAGE_KEYS.input, JSON.stringify(withReferences));
      return withReferences;
    });
  };

  const saveBlueprint = (next: LaunchBlueprint) => {
    setBlueprint(next);
    localStorage.setItem(STORAGE_KEYS.blueprint, JSON.stringify(next));
  };

  const saveRenderRecord = (next: RenderRecord) => {
    setRenderRecord(next);
    localStorage.setItem(STORAGE_KEYS.renders, JSON.stringify(next));
  };

  const setAdminMode = (value: boolean) => {
    setIsAdmin(value);
    localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify(value));
  };

  const remaining = useMemo(() => {
    if (isAdmin) return 999;
    if (!renderRecord) return 3;
    return Math.max(0, renderRecord.limit - renderRecord.used);
  }, [isAdmin, renderRecord]);

  return {
    ready,
    input,
    setInput,
    blueprint,
    saveBlueprint,
    renderRecord,
    saveRenderRecord,
    isAdmin,
    setAdminMode,
    remaining,
  };
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
