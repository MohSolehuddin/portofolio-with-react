// interface SerializedError {
//   name?: string;
//   message?: string;
//   code?: string;
//   stack?: string;
// }

// interface PendingAction<ThunkArg> {
//   type: string;
//   payload: undefined;
//   meta: {
//     requestId: string;
//     arg: ThunkArg;
//   };
// }

// interface FulfilledAction<ThunkArg, PromiseResult> {
//   type: string;
//   payload: PromiseResult;
//   meta: {
//     requestId: string;
//     arg: ThunkArg;
//   };
// }

// interface RejectedAction<ThunkArg> {
//   type: string;
//   payload: undefined;
//   error: SerializedError | any;
//   meta: {
//     requestId: string;
//     arg: ThunkArg;
//     aborted: boolean;
//     condition: boolean;
//   };
// }

// interface RejectedWithValueAction<ThunkArg, RejectedValue> {
//   type: string;
//   payload: RejectedValue;
//   error: { message: "Rejected" };
//   meta: {
//     requestId: string;
//     arg: ThunkArg;
//     aborted: boolean;
//   };
// }

// type Pending = <ThunkArg>(
//   requestId: string,
//   arg: ThunkArg
// ) => PendingAction<ThunkArg>;

// type Fulfilled = <ThunkArg, PromiseResult>(
//   payload: PromiseResult,
//   requestId: string,
//   arg: ThunkArg
// ) => FulfilledAction<ThunkArg, PromiseResult>;

// type Rejected = <ThunkArg>(
//   requestId: string,
//   arg: ThunkArg
// ) => RejectedAction<ThunkArg>;

// type RejectedWithValue = <ThunkArg, RejectedValue>(
//   requestId: string,
//   arg: ThunkArg
// ) => RejectedWithValueAction<ThunkArg, RejectedValue>;

// export {
//   SerializedError,
//   PendingAction,
//   FulfilledAction,
//   RejectedAction,
//   Pending,
//   Fulfilled,
//   Rejected,
//   RejectedWithValue,
// };
