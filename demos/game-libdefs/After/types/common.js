// @flow

declare interface Store<T> {
  data: T[];
  find(number): ?T;
}

declare type Ok<T> = { ok: true, value: T }
declare type Err = { ok: false, error: Error }
declare type Result<T> = Ok<T> | Err
