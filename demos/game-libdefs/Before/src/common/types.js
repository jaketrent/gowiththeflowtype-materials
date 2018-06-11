// @flow

export interface Store<T> {
  data: T[];
  find(number): ?T;
}

export type Ok<T> = { ok: true, value: T }
export type Err = { ok: false, error: Error }
export type Result<T> = Ok<T> | Err
