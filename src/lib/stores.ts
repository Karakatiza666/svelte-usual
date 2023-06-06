import type { Readable, Writable } from "svelte/store";

export type RedableType<T> = T extends Writable<infer R> ? Readable<R> : never
export type StoreType<T> = T extends Writable<infer R> ? R : T extends Readable<infer R> ? R : never
export const asReadable = <T>(s: Writable<T>) => s as Readable<T>