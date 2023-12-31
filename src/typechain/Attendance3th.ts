/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface Attendance3thInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "admin"
      | "attend"
      | "attended"
      | "lock"
      | "lockCheck"
      | "unlockCheck"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(functionFragment: "attend", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "attended",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "lock", values?: undefined): string;
  encodeFunctionData(functionFragment: "lockCheck", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unlockCheck",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "attend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "attended", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lockCheck", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlockCheck",
    data: BytesLike
  ): Result;
}

export interface Attendance3th extends BaseContract {
  connect(runner?: ContractRunner | null): Attendance3th;
  waitForDeployment(): Promise<this>;

  interface: Attendance3thInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  admin: TypedContractMethod<[], [string], "view">;

  attend: TypedContractMethod<[isFirst: boolean], [void], "nonpayable">;

  attended: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  lock: TypedContractMethod<[], [boolean], "view">;

  lockCheck: TypedContractMethod<[], [void], "nonpayable">;

  unlockCheck: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "attend"
  ): TypedContractMethod<[isFirst: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "attended"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "lock"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "lockCheck"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unlockCheck"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
