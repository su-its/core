
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model DiscordAccount
 * 
 */
export type DiscordAccount = $Result.DefaultSelection<Prisma.$DiscordAccountPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Exhibit
 * 
 */
export type Exhibit = $Result.DefaultSelection<Prisma.$ExhibitPayload>
/**
 * Model LightningTalk
 * 
 */
export type LightningTalk = $Result.DefaultSelection<Prisma.$LightningTalkPayload>
/**
 * Model MemberEvent
 * 
 */
export type MemberEvent = $Result.DefaultSelection<Prisma.$MemberEventPayload>
/**
 * Model MemberExhibit
 * 
 */
export type MemberExhibit = $Result.DefaultSelection<Prisma.$MemberExhibitPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Members
 * const members = await prisma.member.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Members
   * const members = await prisma.member.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs>;

  /**
   * `prisma.discordAccount`: Exposes CRUD operations for the **DiscordAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscordAccounts
    * const discordAccounts = await prisma.discordAccount.findMany()
    * ```
    */
  get discordAccount(): Prisma.DiscordAccountDelegate<ExtArgs>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs>;

  /**
   * `prisma.exhibit`: Exposes CRUD operations for the **Exhibit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exhibits
    * const exhibits = await prisma.exhibit.findMany()
    * ```
    */
  get exhibit(): Prisma.ExhibitDelegate<ExtArgs>;

  /**
   * `prisma.lightningTalk`: Exposes CRUD operations for the **LightningTalk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LightningTalks
    * const lightningTalks = await prisma.lightningTalk.findMany()
    * ```
    */
  get lightningTalk(): Prisma.LightningTalkDelegate<ExtArgs>;

  /**
   * `prisma.memberEvent`: Exposes CRUD operations for the **MemberEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberEvents
    * const memberEvents = await prisma.memberEvent.findMany()
    * ```
    */
  get memberEvent(): Prisma.MemberEventDelegate<ExtArgs>;

  /**
   * `prisma.memberExhibit`: Exposes CRUD operations for the **MemberExhibit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberExhibits
    * const memberExhibits = await prisma.memberExhibit.findMany()
    * ```
    */
  get memberExhibit(): Prisma.MemberExhibitDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Member: 'Member',
    DiscordAccount: 'DiscordAccount',
    Event: 'Event',
    Exhibit: 'Exhibit',
    LightningTalk: 'LightningTalk',
    MemberEvent: 'MemberEvent',
    MemberExhibit: 'MemberExhibit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "member" | "discordAccount" | "event" | "exhibit" | "lightningTalk" | "memberEvent" | "memberExhibit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      DiscordAccount: {
        payload: Prisma.$DiscordAccountPayload<ExtArgs>
        fields: Prisma.DiscordAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscordAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscordAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          findFirst: {
            args: Prisma.DiscordAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscordAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          findMany: {
            args: Prisma.DiscordAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>[]
          }
          create: {
            args: Prisma.DiscordAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          createMany: {
            args: Prisma.DiscordAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscordAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>[]
          }
          delete: {
            args: Prisma.DiscordAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          update: {
            args: Prisma.DiscordAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          deleteMany: {
            args: Prisma.DiscordAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscordAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DiscordAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscordAccountPayload>
          }
          aggregate: {
            args: Prisma.DiscordAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscordAccount>
          }
          groupBy: {
            args: Prisma.DiscordAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscordAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscordAccountCountArgs<ExtArgs>
            result: $Utils.Optional<DiscordAccountCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Exhibit: {
        payload: Prisma.$ExhibitPayload<ExtArgs>
        fields: Prisma.ExhibitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExhibitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExhibitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          findFirst: {
            args: Prisma.ExhibitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExhibitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          findMany: {
            args: Prisma.ExhibitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>[]
          }
          create: {
            args: Prisma.ExhibitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          createMany: {
            args: Prisma.ExhibitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExhibitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>[]
          }
          delete: {
            args: Prisma.ExhibitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          update: {
            args: Prisma.ExhibitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          deleteMany: {
            args: Prisma.ExhibitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExhibitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExhibitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExhibitPayload>
          }
          aggregate: {
            args: Prisma.ExhibitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExhibit>
          }
          groupBy: {
            args: Prisma.ExhibitGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExhibitGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExhibitCountArgs<ExtArgs>
            result: $Utils.Optional<ExhibitCountAggregateOutputType> | number
          }
        }
      }
      LightningTalk: {
        payload: Prisma.$LightningTalkPayload<ExtArgs>
        fields: Prisma.LightningTalkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LightningTalkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LightningTalkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          findFirst: {
            args: Prisma.LightningTalkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LightningTalkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          findMany: {
            args: Prisma.LightningTalkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>[]
          }
          create: {
            args: Prisma.LightningTalkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          createMany: {
            args: Prisma.LightningTalkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LightningTalkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>[]
          }
          delete: {
            args: Prisma.LightningTalkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          update: {
            args: Prisma.LightningTalkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          deleteMany: {
            args: Prisma.LightningTalkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LightningTalkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LightningTalkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LightningTalkPayload>
          }
          aggregate: {
            args: Prisma.LightningTalkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLightningTalk>
          }
          groupBy: {
            args: Prisma.LightningTalkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LightningTalkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LightningTalkCountArgs<ExtArgs>
            result: $Utils.Optional<LightningTalkCountAggregateOutputType> | number
          }
        }
      }
      MemberEvent: {
        payload: Prisma.$MemberEventPayload<ExtArgs>
        fields: Prisma.MemberEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          findFirst: {
            args: Prisma.MemberEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          findMany: {
            args: Prisma.MemberEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>[]
          }
          create: {
            args: Prisma.MemberEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          createMany: {
            args: Prisma.MemberEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>[]
          }
          delete: {
            args: Prisma.MemberEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          update: {
            args: Prisma.MemberEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          deleteMany: {
            args: Prisma.MemberEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberEventPayload>
          }
          aggregate: {
            args: Prisma.MemberEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberEvent>
          }
          groupBy: {
            args: Prisma.MemberEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberEventCountArgs<ExtArgs>
            result: $Utils.Optional<MemberEventCountAggregateOutputType> | number
          }
        }
      }
      MemberExhibit: {
        payload: Prisma.$MemberExhibitPayload<ExtArgs>
        fields: Prisma.MemberExhibitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberExhibitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberExhibitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          findFirst: {
            args: Prisma.MemberExhibitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberExhibitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          findMany: {
            args: Prisma.MemberExhibitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>[]
          }
          create: {
            args: Prisma.MemberExhibitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          createMany: {
            args: Prisma.MemberExhibitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberExhibitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>[]
          }
          delete: {
            args: Prisma.MemberExhibitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          update: {
            args: Prisma.MemberExhibitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          deleteMany: {
            args: Prisma.MemberExhibitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberExhibitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MemberExhibitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExhibitPayload>
          }
          aggregate: {
            args: Prisma.MemberExhibitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberExhibit>
          }
          groupBy: {
            args: Prisma.MemberExhibitGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberExhibitGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberExhibitCountArgs<ExtArgs>
            result: $Utils.Optional<MemberExhibitCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    discordAccounts: number
    events: number
    exhibits: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discordAccounts?: boolean | MemberCountOutputTypeCountDiscordAccountsArgs
    events?: boolean | MemberCountOutputTypeCountEventsArgs
    exhibits?: boolean | MemberCountOutputTypeCountExhibitsArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountDiscordAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscordAccountWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberEventWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountExhibitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberExhibitWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    members: number
    exhibits: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | EventCountOutputTypeCountMembersArgs
    exhibits?: boolean | EventCountOutputTypeCountExhibitsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberEventWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountExhibitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExhibitWhereInput
  }


  /**
   * Count Type ExhibitCountOutputType
   */

  export type ExhibitCountOutputType = {
    members: number
  }

  export type ExhibitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ExhibitCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * ExhibitCountOutputType without action
   */
  export type ExhibitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExhibitCountOutputType
     */
    select?: ExhibitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExhibitCountOutputType without action
   */
  export type ExhibitCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberExhibitWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    name: string | null
    studentId: string | null
    department: string | null
    email: string | null
    personalEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    name: string | null
    studentId: string | null
    department: string | null
    email: string | null
    personalEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    name: number
    studentId: number
    department: number
    email: number
    personalEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    name?: true
    studentId?: true
    department?: true
    email?: true
    personalEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    name?: true
    studentId?: true
    department?: true
    email?: true
    personalEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    name?: true
    studentId?: true
    department?: true
    email?: true
    personalEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    studentId?: boolean
    department?: boolean
    email?: boolean
    personalEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    discordAccounts?: boolean | Member$discordAccountsArgs<ExtArgs>
    events?: boolean | Member$eventsArgs<ExtArgs>
    exhibits?: boolean | Member$exhibitsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    studentId?: boolean
    department?: boolean
    email?: boolean
    personalEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    name?: boolean
    studentId?: boolean
    department?: boolean
    email?: boolean
    personalEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discordAccounts?: boolean | Member$discordAccountsArgs<ExtArgs>
    events?: boolean | Member$eventsArgs<ExtArgs>
    exhibits?: boolean | Member$exhibitsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      discordAccounts: Prisma.$DiscordAccountPayload<ExtArgs>[]
      events: Prisma.$MemberEventPayload<ExtArgs>[]
      exhibits: Prisma.$MemberExhibitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      studentId: string
      department: string
      email: string
      personalEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    discordAccounts<T extends Member$discordAccountsArgs<ExtArgs> = {}>(args?: Subset<T, Member$discordAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findMany"> | Null>
    events<T extends Member$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Member$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findMany"> | Null>
    exhibits<T extends Member$exhibitsArgs<ExtArgs> = {}>(args?: Subset<T, Member$exhibitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */ 
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly name: FieldRef<"Member", 'String'>
    readonly studentId: FieldRef<"Member", 'String'>
    readonly department: FieldRef<"Member", 'String'>
    readonly email: FieldRef<"Member", 'String'>
    readonly personalEmail: FieldRef<"Member", 'String'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
  }

  /**
   * Member.discordAccounts
   */
  export type Member$discordAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    where?: DiscordAccountWhereInput
    orderBy?: DiscordAccountOrderByWithRelationInput | DiscordAccountOrderByWithRelationInput[]
    cursor?: DiscordAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiscordAccountScalarFieldEnum | DiscordAccountScalarFieldEnum[]
  }

  /**
   * Member.events
   */
  export type Member$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    where?: MemberEventWhereInput
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    cursor?: MemberEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberEventScalarFieldEnum | MemberEventScalarFieldEnum[]
  }

  /**
   * Member.exhibits
   */
  export type Member$exhibitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    where?: MemberExhibitWhereInput
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    cursor?: MemberExhibitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberExhibitScalarFieldEnum | MemberExhibitScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model DiscordAccount
   */

  export type AggregateDiscordAccount = {
    _count: DiscordAccountCountAggregateOutputType | null
    _min: DiscordAccountMinAggregateOutputType | null
    _max: DiscordAccountMaxAggregateOutputType | null
  }

  export type DiscordAccountMinAggregateOutputType = {
    id: string | null
    nickName: string | null
    memberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiscordAccountMaxAggregateOutputType = {
    id: string | null
    nickName: string | null
    memberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiscordAccountCountAggregateOutputType = {
    id: number
    nickName: number
    memberId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DiscordAccountMinAggregateInputType = {
    id?: true
    nickName?: true
    memberId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiscordAccountMaxAggregateInputType = {
    id?: true
    nickName?: true
    memberId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiscordAccountCountAggregateInputType = {
    id?: true
    nickName?: true
    memberId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DiscordAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscordAccount to aggregate.
     */
    where?: DiscordAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscordAccounts to fetch.
     */
    orderBy?: DiscordAccountOrderByWithRelationInput | DiscordAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscordAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscordAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscordAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscordAccounts
    **/
    _count?: true | DiscordAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscordAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscordAccountMaxAggregateInputType
  }

  export type GetDiscordAccountAggregateType<T extends DiscordAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscordAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscordAccount[P]>
      : GetScalarType<T[P], AggregateDiscordAccount[P]>
  }




  export type DiscordAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscordAccountWhereInput
    orderBy?: DiscordAccountOrderByWithAggregationInput | DiscordAccountOrderByWithAggregationInput[]
    by: DiscordAccountScalarFieldEnum[] | DiscordAccountScalarFieldEnum
    having?: DiscordAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscordAccountCountAggregateInputType | true
    _min?: DiscordAccountMinAggregateInputType
    _max?: DiscordAccountMaxAggregateInputType
  }

  export type DiscordAccountGroupByOutputType = {
    id: string
    nickName: string
    memberId: string
    createdAt: Date
    updatedAt: Date
    _count: DiscordAccountCountAggregateOutputType | null
    _min: DiscordAccountMinAggregateOutputType | null
    _max: DiscordAccountMaxAggregateOutputType | null
  }

  type GetDiscordAccountGroupByPayload<T extends DiscordAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscordAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscordAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscordAccountGroupByOutputType[P]>
            : GetScalarType<T[P], DiscordAccountGroupByOutputType[P]>
        }
      >
    >


  export type DiscordAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickName?: boolean
    memberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discordAccount"]>

  export type DiscordAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickName?: boolean
    memberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discordAccount"]>

  export type DiscordAccountSelectScalar = {
    id?: boolean
    nickName?: boolean
    memberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DiscordAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }
  export type DiscordAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }

  export type $DiscordAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscordAccount"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nickName: string
      memberId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["discordAccount"]>
    composites: {}
  }

  type DiscordAccountGetPayload<S extends boolean | null | undefined | DiscordAccountDefaultArgs> = $Result.GetResult<Prisma.$DiscordAccountPayload, S>

  type DiscordAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DiscordAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DiscordAccountCountAggregateInputType | true
    }

  export interface DiscordAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscordAccount'], meta: { name: 'DiscordAccount' } }
    /**
     * Find zero or one DiscordAccount that matches the filter.
     * @param {DiscordAccountFindUniqueArgs} args - Arguments to find a DiscordAccount
     * @example
     * // Get one DiscordAccount
     * const discordAccount = await prisma.discordAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscordAccountFindUniqueArgs>(args: SelectSubset<T, DiscordAccountFindUniqueArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DiscordAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DiscordAccountFindUniqueOrThrowArgs} args - Arguments to find a DiscordAccount
     * @example
     * // Get one DiscordAccount
     * const discordAccount = await prisma.discordAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscordAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscordAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DiscordAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountFindFirstArgs} args - Arguments to find a DiscordAccount
     * @example
     * // Get one DiscordAccount
     * const discordAccount = await prisma.discordAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscordAccountFindFirstArgs>(args?: SelectSubset<T, DiscordAccountFindFirstArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DiscordAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountFindFirstOrThrowArgs} args - Arguments to find a DiscordAccount
     * @example
     * // Get one DiscordAccount
     * const discordAccount = await prisma.discordAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscordAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscordAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DiscordAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscordAccounts
     * const discordAccounts = await prisma.discordAccount.findMany()
     * 
     * // Get first 10 DiscordAccounts
     * const discordAccounts = await prisma.discordAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discordAccountWithIdOnly = await prisma.discordAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscordAccountFindManyArgs>(args?: SelectSubset<T, DiscordAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DiscordAccount.
     * @param {DiscordAccountCreateArgs} args - Arguments to create a DiscordAccount.
     * @example
     * // Create one DiscordAccount
     * const DiscordAccount = await prisma.discordAccount.create({
     *   data: {
     *     // ... data to create a DiscordAccount
     *   }
     * })
     * 
     */
    create<T extends DiscordAccountCreateArgs>(args: SelectSubset<T, DiscordAccountCreateArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DiscordAccounts.
     * @param {DiscordAccountCreateManyArgs} args - Arguments to create many DiscordAccounts.
     * @example
     * // Create many DiscordAccounts
     * const discordAccount = await prisma.discordAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscordAccountCreateManyArgs>(args?: SelectSubset<T, DiscordAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscordAccounts and returns the data saved in the database.
     * @param {DiscordAccountCreateManyAndReturnArgs} args - Arguments to create many DiscordAccounts.
     * @example
     * // Create many DiscordAccounts
     * const discordAccount = await prisma.discordAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscordAccounts and only return the `id`
     * const discordAccountWithIdOnly = await prisma.discordAccount.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscordAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscordAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DiscordAccount.
     * @param {DiscordAccountDeleteArgs} args - Arguments to delete one DiscordAccount.
     * @example
     * // Delete one DiscordAccount
     * const DiscordAccount = await prisma.discordAccount.delete({
     *   where: {
     *     // ... filter to delete one DiscordAccount
     *   }
     * })
     * 
     */
    delete<T extends DiscordAccountDeleteArgs>(args: SelectSubset<T, DiscordAccountDeleteArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DiscordAccount.
     * @param {DiscordAccountUpdateArgs} args - Arguments to update one DiscordAccount.
     * @example
     * // Update one DiscordAccount
     * const discordAccount = await prisma.discordAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscordAccountUpdateArgs>(args: SelectSubset<T, DiscordAccountUpdateArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DiscordAccounts.
     * @param {DiscordAccountDeleteManyArgs} args - Arguments to filter DiscordAccounts to delete.
     * @example
     * // Delete a few DiscordAccounts
     * const { count } = await prisma.discordAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscordAccountDeleteManyArgs>(args?: SelectSubset<T, DiscordAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscordAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscordAccounts
     * const discordAccount = await prisma.discordAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscordAccountUpdateManyArgs>(args: SelectSubset<T, DiscordAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DiscordAccount.
     * @param {DiscordAccountUpsertArgs} args - Arguments to update or create a DiscordAccount.
     * @example
     * // Update or create a DiscordAccount
     * const discordAccount = await prisma.discordAccount.upsert({
     *   create: {
     *     // ... data to create a DiscordAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscordAccount we want to update
     *   }
     * })
     */
    upsert<T extends DiscordAccountUpsertArgs>(args: SelectSubset<T, DiscordAccountUpsertArgs<ExtArgs>>): Prisma__DiscordAccountClient<$Result.GetResult<Prisma.$DiscordAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DiscordAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountCountArgs} args - Arguments to filter DiscordAccounts to count.
     * @example
     * // Count the number of DiscordAccounts
     * const count = await prisma.discordAccount.count({
     *   where: {
     *     // ... the filter for the DiscordAccounts we want to count
     *   }
     * })
    **/
    count<T extends DiscordAccountCountArgs>(
      args?: Subset<T, DiscordAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscordAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscordAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscordAccountAggregateArgs>(args: Subset<T, DiscordAccountAggregateArgs>): Prisma.PrismaPromise<GetDiscordAccountAggregateType<T>>

    /**
     * Group by DiscordAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscordAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscordAccountGroupByArgs['orderBy'] }
        : { orderBy?: DiscordAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscordAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscordAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscordAccount model
   */
  readonly fields: DiscordAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscordAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscordAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DiscordAccount model
   */ 
  interface DiscordAccountFieldRefs {
    readonly id: FieldRef<"DiscordAccount", 'String'>
    readonly nickName: FieldRef<"DiscordAccount", 'String'>
    readonly memberId: FieldRef<"DiscordAccount", 'String'>
    readonly createdAt: FieldRef<"DiscordAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"DiscordAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DiscordAccount findUnique
   */
  export type DiscordAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter, which DiscordAccount to fetch.
     */
    where: DiscordAccountWhereUniqueInput
  }

  /**
   * DiscordAccount findUniqueOrThrow
   */
  export type DiscordAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter, which DiscordAccount to fetch.
     */
    where: DiscordAccountWhereUniqueInput
  }

  /**
   * DiscordAccount findFirst
   */
  export type DiscordAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter, which DiscordAccount to fetch.
     */
    where?: DiscordAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscordAccounts to fetch.
     */
    orderBy?: DiscordAccountOrderByWithRelationInput | DiscordAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscordAccounts.
     */
    cursor?: DiscordAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscordAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscordAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscordAccounts.
     */
    distinct?: DiscordAccountScalarFieldEnum | DiscordAccountScalarFieldEnum[]
  }

  /**
   * DiscordAccount findFirstOrThrow
   */
  export type DiscordAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter, which DiscordAccount to fetch.
     */
    where?: DiscordAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscordAccounts to fetch.
     */
    orderBy?: DiscordAccountOrderByWithRelationInput | DiscordAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscordAccounts.
     */
    cursor?: DiscordAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscordAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscordAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscordAccounts.
     */
    distinct?: DiscordAccountScalarFieldEnum | DiscordAccountScalarFieldEnum[]
  }

  /**
   * DiscordAccount findMany
   */
  export type DiscordAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter, which DiscordAccounts to fetch.
     */
    where?: DiscordAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscordAccounts to fetch.
     */
    orderBy?: DiscordAccountOrderByWithRelationInput | DiscordAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscordAccounts.
     */
    cursor?: DiscordAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscordAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscordAccounts.
     */
    skip?: number
    distinct?: DiscordAccountScalarFieldEnum | DiscordAccountScalarFieldEnum[]
  }

  /**
   * DiscordAccount create
   */
  export type DiscordAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a DiscordAccount.
     */
    data: XOR<DiscordAccountCreateInput, DiscordAccountUncheckedCreateInput>
  }

  /**
   * DiscordAccount createMany
   */
  export type DiscordAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscordAccounts.
     */
    data: DiscordAccountCreateManyInput | DiscordAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscordAccount createManyAndReturn
   */
  export type DiscordAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DiscordAccounts.
     */
    data: DiscordAccountCreateManyInput | DiscordAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiscordAccount update
   */
  export type DiscordAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a DiscordAccount.
     */
    data: XOR<DiscordAccountUpdateInput, DiscordAccountUncheckedUpdateInput>
    /**
     * Choose, which DiscordAccount to update.
     */
    where: DiscordAccountWhereUniqueInput
  }

  /**
   * DiscordAccount updateMany
   */
  export type DiscordAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscordAccounts.
     */
    data: XOR<DiscordAccountUpdateManyMutationInput, DiscordAccountUncheckedUpdateManyInput>
    /**
     * Filter which DiscordAccounts to update
     */
    where?: DiscordAccountWhereInput
  }

  /**
   * DiscordAccount upsert
   */
  export type DiscordAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the DiscordAccount to update in case it exists.
     */
    where: DiscordAccountWhereUniqueInput
    /**
     * In case the DiscordAccount found by the `where` argument doesn't exist, create a new DiscordAccount with this data.
     */
    create: XOR<DiscordAccountCreateInput, DiscordAccountUncheckedCreateInput>
    /**
     * In case the DiscordAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscordAccountUpdateInput, DiscordAccountUncheckedUpdateInput>
  }

  /**
   * DiscordAccount delete
   */
  export type DiscordAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
    /**
     * Filter which DiscordAccount to delete.
     */
    where: DiscordAccountWhereUniqueInput
  }

  /**
   * DiscordAccount deleteMany
   */
  export type DiscordAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscordAccounts to delete
     */
    where?: DiscordAccountWhereInput
  }

  /**
   * DiscordAccount without action
   */
  export type DiscordAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscordAccount
     */
    select?: DiscordAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiscordAccountInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    name: string
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Event$membersArgs<ExtArgs>
    exhibits?: boolean | Event$exhibitsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Event$membersArgs<ExtArgs>
    exhibits?: boolean | Event$exhibitsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      members: Prisma.$MemberEventPayload<ExtArgs>[]
      exhibits: Prisma.$ExhibitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      date: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Event$membersArgs<ExtArgs> = {}>(args?: Subset<T, Event$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findMany"> | Null>
    exhibits<T extends Event$exhibitsArgs<ExtArgs> = {}>(args?: Subset<T, Event$exhibitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly name: FieldRef<"Event", 'String'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }

  /**
   * Event.members
   */
  export type Event$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    where?: MemberEventWhereInput
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    cursor?: MemberEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberEventScalarFieldEnum | MemberEventScalarFieldEnum[]
  }

  /**
   * Event.exhibits
   */
  export type Event$exhibitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    where?: ExhibitWhereInput
    orderBy?: ExhibitOrderByWithRelationInput | ExhibitOrderByWithRelationInput[]
    cursor?: ExhibitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExhibitScalarFieldEnum | ExhibitScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Exhibit
   */

  export type AggregateExhibit = {
    _count: ExhibitCountAggregateOutputType | null
    _min: ExhibitMinAggregateOutputType | null
    _max: ExhibitMaxAggregateOutputType | null
  }

  export type ExhibitMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    markdownContent: string | null
    url: string | null
    eventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExhibitMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    markdownContent: string | null
    url: string | null
    eventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExhibitCountAggregateOutputType = {
    id: number
    name: number
    description: number
    markdownContent: number
    url: number
    eventId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExhibitMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    markdownContent?: true
    url?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExhibitMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    markdownContent?: true
    url?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExhibitCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    markdownContent?: true
    url?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExhibitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exhibit to aggregate.
     */
    where?: ExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exhibits to fetch.
     */
    orderBy?: ExhibitOrderByWithRelationInput | ExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exhibits
    **/
    _count?: true | ExhibitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExhibitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExhibitMaxAggregateInputType
  }

  export type GetExhibitAggregateType<T extends ExhibitAggregateArgs> = {
        [P in keyof T & keyof AggregateExhibit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExhibit[P]>
      : GetScalarType<T[P], AggregateExhibit[P]>
  }




  export type ExhibitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExhibitWhereInput
    orderBy?: ExhibitOrderByWithAggregationInput | ExhibitOrderByWithAggregationInput[]
    by: ExhibitScalarFieldEnum[] | ExhibitScalarFieldEnum
    having?: ExhibitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExhibitCountAggregateInputType | true
    _min?: ExhibitMinAggregateInputType
    _max?: ExhibitMaxAggregateInputType
  }

  export type ExhibitGroupByOutputType = {
    id: string
    name: string
    description: string | null
    markdownContent: string | null
    url: string | null
    eventId: string
    createdAt: Date
    updatedAt: Date
    _count: ExhibitCountAggregateOutputType | null
    _min: ExhibitMinAggregateOutputType | null
    _max: ExhibitMaxAggregateOutputType | null
  }

  type GetExhibitGroupByPayload<T extends ExhibitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExhibitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExhibitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExhibitGroupByOutputType[P]>
            : GetScalarType<T[P], ExhibitGroupByOutputType[P]>
        }
      >
    >


  export type ExhibitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    markdownContent?: boolean
    url?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    members?: boolean | Exhibit$membersArgs<ExtArgs>
    lightningTalk?: boolean | Exhibit$lightningTalkArgs<ExtArgs>
    _count?: boolean | ExhibitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exhibit"]>

  export type ExhibitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    markdownContent?: boolean
    url?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exhibit"]>

  export type ExhibitSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    markdownContent?: boolean
    url?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExhibitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    members?: boolean | Exhibit$membersArgs<ExtArgs>
    lightningTalk?: boolean | Exhibit$lightningTalkArgs<ExtArgs>
    _count?: boolean | ExhibitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExhibitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $ExhibitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exhibit"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      members: Prisma.$MemberExhibitPayload<ExtArgs>[]
      lightningTalk: Prisma.$LightningTalkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      markdownContent: string | null
      url: string | null
      eventId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exhibit"]>
    composites: {}
  }

  type ExhibitGetPayload<S extends boolean | null | undefined | ExhibitDefaultArgs> = $Result.GetResult<Prisma.$ExhibitPayload, S>

  type ExhibitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExhibitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExhibitCountAggregateInputType | true
    }

  export interface ExhibitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exhibit'], meta: { name: 'Exhibit' } }
    /**
     * Find zero or one Exhibit that matches the filter.
     * @param {ExhibitFindUniqueArgs} args - Arguments to find a Exhibit
     * @example
     * // Get one Exhibit
     * const exhibit = await prisma.exhibit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExhibitFindUniqueArgs>(args: SelectSubset<T, ExhibitFindUniqueArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Exhibit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExhibitFindUniqueOrThrowArgs} args - Arguments to find a Exhibit
     * @example
     * // Get one Exhibit
     * const exhibit = await prisma.exhibit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExhibitFindUniqueOrThrowArgs>(args: SelectSubset<T, ExhibitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Exhibit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitFindFirstArgs} args - Arguments to find a Exhibit
     * @example
     * // Get one Exhibit
     * const exhibit = await prisma.exhibit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExhibitFindFirstArgs>(args?: SelectSubset<T, ExhibitFindFirstArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Exhibit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitFindFirstOrThrowArgs} args - Arguments to find a Exhibit
     * @example
     * // Get one Exhibit
     * const exhibit = await prisma.exhibit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExhibitFindFirstOrThrowArgs>(args?: SelectSubset<T, ExhibitFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Exhibits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exhibits
     * const exhibits = await prisma.exhibit.findMany()
     * 
     * // Get first 10 Exhibits
     * const exhibits = await prisma.exhibit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exhibitWithIdOnly = await prisma.exhibit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExhibitFindManyArgs>(args?: SelectSubset<T, ExhibitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Exhibit.
     * @param {ExhibitCreateArgs} args - Arguments to create a Exhibit.
     * @example
     * // Create one Exhibit
     * const Exhibit = await prisma.exhibit.create({
     *   data: {
     *     // ... data to create a Exhibit
     *   }
     * })
     * 
     */
    create<T extends ExhibitCreateArgs>(args: SelectSubset<T, ExhibitCreateArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Exhibits.
     * @param {ExhibitCreateManyArgs} args - Arguments to create many Exhibits.
     * @example
     * // Create many Exhibits
     * const exhibit = await prisma.exhibit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExhibitCreateManyArgs>(args?: SelectSubset<T, ExhibitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exhibits and returns the data saved in the database.
     * @param {ExhibitCreateManyAndReturnArgs} args - Arguments to create many Exhibits.
     * @example
     * // Create many Exhibits
     * const exhibit = await prisma.exhibit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exhibits and only return the `id`
     * const exhibitWithIdOnly = await prisma.exhibit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExhibitCreateManyAndReturnArgs>(args?: SelectSubset<T, ExhibitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Exhibit.
     * @param {ExhibitDeleteArgs} args - Arguments to delete one Exhibit.
     * @example
     * // Delete one Exhibit
     * const Exhibit = await prisma.exhibit.delete({
     *   where: {
     *     // ... filter to delete one Exhibit
     *   }
     * })
     * 
     */
    delete<T extends ExhibitDeleteArgs>(args: SelectSubset<T, ExhibitDeleteArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Exhibit.
     * @param {ExhibitUpdateArgs} args - Arguments to update one Exhibit.
     * @example
     * // Update one Exhibit
     * const exhibit = await prisma.exhibit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExhibitUpdateArgs>(args: SelectSubset<T, ExhibitUpdateArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Exhibits.
     * @param {ExhibitDeleteManyArgs} args - Arguments to filter Exhibits to delete.
     * @example
     * // Delete a few Exhibits
     * const { count } = await prisma.exhibit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExhibitDeleteManyArgs>(args?: SelectSubset<T, ExhibitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exhibits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exhibits
     * const exhibit = await prisma.exhibit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExhibitUpdateManyArgs>(args: SelectSubset<T, ExhibitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exhibit.
     * @param {ExhibitUpsertArgs} args - Arguments to update or create a Exhibit.
     * @example
     * // Update or create a Exhibit
     * const exhibit = await prisma.exhibit.upsert({
     *   create: {
     *     // ... data to create a Exhibit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exhibit we want to update
     *   }
     * })
     */
    upsert<T extends ExhibitUpsertArgs>(args: SelectSubset<T, ExhibitUpsertArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Exhibits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitCountArgs} args - Arguments to filter Exhibits to count.
     * @example
     * // Count the number of Exhibits
     * const count = await prisma.exhibit.count({
     *   where: {
     *     // ... the filter for the Exhibits we want to count
     *   }
     * })
    **/
    count<T extends ExhibitCountArgs>(
      args?: Subset<T, ExhibitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExhibitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exhibit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExhibitAggregateArgs>(args: Subset<T, ExhibitAggregateArgs>): Prisma.PrismaPromise<GetExhibitAggregateType<T>>

    /**
     * Group by Exhibit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExhibitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExhibitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExhibitGroupByArgs['orderBy'] }
        : { orderBy?: ExhibitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExhibitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExhibitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exhibit model
   */
  readonly fields: ExhibitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exhibit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExhibitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    members<T extends Exhibit$membersArgs<ExtArgs> = {}>(args?: Subset<T, Exhibit$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findMany"> | Null>
    lightningTalk<T extends Exhibit$lightningTalkArgs<ExtArgs> = {}>(args?: Subset<T, Exhibit$lightningTalkArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exhibit model
   */ 
  interface ExhibitFieldRefs {
    readonly id: FieldRef<"Exhibit", 'String'>
    readonly name: FieldRef<"Exhibit", 'String'>
    readonly description: FieldRef<"Exhibit", 'String'>
    readonly markdownContent: FieldRef<"Exhibit", 'String'>
    readonly url: FieldRef<"Exhibit", 'String'>
    readonly eventId: FieldRef<"Exhibit", 'String'>
    readonly createdAt: FieldRef<"Exhibit", 'DateTime'>
    readonly updatedAt: FieldRef<"Exhibit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exhibit findUnique
   */
  export type ExhibitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter, which Exhibit to fetch.
     */
    where: ExhibitWhereUniqueInput
  }

  /**
   * Exhibit findUniqueOrThrow
   */
  export type ExhibitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter, which Exhibit to fetch.
     */
    where: ExhibitWhereUniqueInput
  }

  /**
   * Exhibit findFirst
   */
  export type ExhibitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter, which Exhibit to fetch.
     */
    where?: ExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exhibits to fetch.
     */
    orderBy?: ExhibitOrderByWithRelationInput | ExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exhibits.
     */
    cursor?: ExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exhibits.
     */
    distinct?: ExhibitScalarFieldEnum | ExhibitScalarFieldEnum[]
  }

  /**
   * Exhibit findFirstOrThrow
   */
  export type ExhibitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter, which Exhibit to fetch.
     */
    where?: ExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exhibits to fetch.
     */
    orderBy?: ExhibitOrderByWithRelationInput | ExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exhibits.
     */
    cursor?: ExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exhibits.
     */
    distinct?: ExhibitScalarFieldEnum | ExhibitScalarFieldEnum[]
  }

  /**
   * Exhibit findMany
   */
  export type ExhibitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter, which Exhibits to fetch.
     */
    where?: ExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exhibits to fetch.
     */
    orderBy?: ExhibitOrderByWithRelationInput | ExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exhibits.
     */
    cursor?: ExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exhibits.
     */
    skip?: number
    distinct?: ExhibitScalarFieldEnum | ExhibitScalarFieldEnum[]
  }

  /**
   * Exhibit create
   */
  export type ExhibitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * The data needed to create a Exhibit.
     */
    data: XOR<ExhibitCreateInput, ExhibitUncheckedCreateInput>
  }

  /**
   * Exhibit createMany
   */
  export type ExhibitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exhibits.
     */
    data: ExhibitCreateManyInput | ExhibitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exhibit createManyAndReturn
   */
  export type ExhibitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Exhibits.
     */
    data: ExhibitCreateManyInput | ExhibitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exhibit update
   */
  export type ExhibitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * The data needed to update a Exhibit.
     */
    data: XOR<ExhibitUpdateInput, ExhibitUncheckedUpdateInput>
    /**
     * Choose, which Exhibit to update.
     */
    where: ExhibitWhereUniqueInput
  }

  /**
   * Exhibit updateMany
   */
  export type ExhibitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exhibits.
     */
    data: XOR<ExhibitUpdateManyMutationInput, ExhibitUncheckedUpdateManyInput>
    /**
     * Filter which Exhibits to update
     */
    where?: ExhibitWhereInput
  }

  /**
   * Exhibit upsert
   */
  export type ExhibitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * The filter to search for the Exhibit to update in case it exists.
     */
    where: ExhibitWhereUniqueInput
    /**
     * In case the Exhibit found by the `where` argument doesn't exist, create a new Exhibit with this data.
     */
    create: XOR<ExhibitCreateInput, ExhibitUncheckedCreateInput>
    /**
     * In case the Exhibit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExhibitUpdateInput, ExhibitUncheckedUpdateInput>
  }

  /**
   * Exhibit delete
   */
  export type ExhibitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
    /**
     * Filter which Exhibit to delete.
     */
    where: ExhibitWhereUniqueInput
  }

  /**
   * Exhibit deleteMany
   */
  export type ExhibitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exhibits to delete
     */
    where?: ExhibitWhereInput
  }

  /**
   * Exhibit.members
   */
  export type Exhibit$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    where?: MemberExhibitWhereInput
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    cursor?: MemberExhibitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberExhibitScalarFieldEnum | MemberExhibitScalarFieldEnum[]
  }

  /**
   * Exhibit.lightningTalk
   */
  export type Exhibit$lightningTalkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    where?: LightningTalkWhereInput
  }

  /**
   * Exhibit without action
   */
  export type ExhibitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exhibit
     */
    select?: ExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExhibitInclude<ExtArgs> | null
  }


  /**
   * Model LightningTalk
   */

  export type AggregateLightningTalk = {
    _count: LightningTalkCountAggregateOutputType | null
    _avg: LightningTalkAvgAggregateOutputType | null
    _sum: LightningTalkSumAggregateOutputType | null
    _min: LightningTalkMinAggregateOutputType | null
    _max: LightningTalkMaxAggregateOutputType | null
  }

  export type LightningTalkAvgAggregateOutputType = {
    duration: number | null
  }

  export type LightningTalkSumAggregateOutputType = {
    duration: number | null
  }

  export type LightningTalkMinAggregateOutputType = {
    exhibitId: string | null
    startTime: Date | null
    duration: number | null
    slideUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LightningTalkMaxAggregateOutputType = {
    exhibitId: string | null
    startTime: Date | null
    duration: number | null
    slideUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LightningTalkCountAggregateOutputType = {
    exhibitId: number
    startTime: number
    duration: number
    slideUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LightningTalkAvgAggregateInputType = {
    duration?: true
  }

  export type LightningTalkSumAggregateInputType = {
    duration?: true
  }

  export type LightningTalkMinAggregateInputType = {
    exhibitId?: true
    startTime?: true
    duration?: true
    slideUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LightningTalkMaxAggregateInputType = {
    exhibitId?: true
    startTime?: true
    duration?: true
    slideUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LightningTalkCountAggregateInputType = {
    exhibitId?: true
    startTime?: true
    duration?: true
    slideUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LightningTalkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LightningTalk to aggregate.
     */
    where?: LightningTalkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LightningTalks to fetch.
     */
    orderBy?: LightningTalkOrderByWithRelationInput | LightningTalkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LightningTalkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LightningTalks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LightningTalks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LightningTalks
    **/
    _count?: true | LightningTalkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LightningTalkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LightningTalkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LightningTalkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LightningTalkMaxAggregateInputType
  }

  export type GetLightningTalkAggregateType<T extends LightningTalkAggregateArgs> = {
        [P in keyof T & keyof AggregateLightningTalk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLightningTalk[P]>
      : GetScalarType<T[P], AggregateLightningTalk[P]>
  }




  export type LightningTalkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LightningTalkWhereInput
    orderBy?: LightningTalkOrderByWithAggregationInput | LightningTalkOrderByWithAggregationInput[]
    by: LightningTalkScalarFieldEnum[] | LightningTalkScalarFieldEnum
    having?: LightningTalkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LightningTalkCountAggregateInputType | true
    _avg?: LightningTalkAvgAggregateInputType
    _sum?: LightningTalkSumAggregateInputType
    _min?: LightningTalkMinAggregateInputType
    _max?: LightningTalkMaxAggregateInputType
  }

  export type LightningTalkGroupByOutputType = {
    exhibitId: string
    startTime: Date
    duration: number
    slideUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: LightningTalkCountAggregateOutputType | null
    _avg: LightningTalkAvgAggregateOutputType | null
    _sum: LightningTalkSumAggregateOutputType | null
    _min: LightningTalkMinAggregateOutputType | null
    _max: LightningTalkMaxAggregateOutputType | null
  }

  type GetLightningTalkGroupByPayload<T extends LightningTalkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LightningTalkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LightningTalkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LightningTalkGroupByOutputType[P]>
            : GetScalarType<T[P], LightningTalkGroupByOutputType[P]>
        }
      >
    >


  export type LightningTalkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    exhibitId?: boolean
    startTime?: boolean
    duration?: boolean
    slideUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lightningTalk"]>

  export type LightningTalkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    exhibitId?: boolean
    startTime?: boolean
    duration?: boolean
    slideUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lightningTalk"]>

  export type LightningTalkSelectScalar = {
    exhibitId?: boolean
    startTime?: boolean
    duration?: boolean
    slideUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LightningTalkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }
  export type LightningTalkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }

  export type $LightningTalkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LightningTalk"
    objects: {
      exhibit: Prisma.$ExhibitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      exhibitId: string
      startTime: Date
      duration: number
      slideUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lightningTalk"]>
    composites: {}
  }

  type LightningTalkGetPayload<S extends boolean | null | undefined | LightningTalkDefaultArgs> = $Result.GetResult<Prisma.$LightningTalkPayload, S>

  type LightningTalkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LightningTalkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LightningTalkCountAggregateInputType | true
    }

  export interface LightningTalkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LightningTalk'], meta: { name: 'LightningTalk' } }
    /**
     * Find zero or one LightningTalk that matches the filter.
     * @param {LightningTalkFindUniqueArgs} args - Arguments to find a LightningTalk
     * @example
     * // Get one LightningTalk
     * const lightningTalk = await prisma.lightningTalk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LightningTalkFindUniqueArgs>(args: SelectSubset<T, LightningTalkFindUniqueArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LightningTalk that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LightningTalkFindUniqueOrThrowArgs} args - Arguments to find a LightningTalk
     * @example
     * // Get one LightningTalk
     * const lightningTalk = await prisma.lightningTalk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LightningTalkFindUniqueOrThrowArgs>(args: SelectSubset<T, LightningTalkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LightningTalk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkFindFirstArgs} args - Arguments to find a LightningTalk
     * @example
     * // Get one LightningTalk
     * const lightningTalk = await prisma.lightningTalk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LightningTalkFindFirstArgs>(args?: SelectSubset<T, LightningTalkFindFirstArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LightningTalk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkFindFirstOrThrowArgs} args - Arguments to find a LightningTalk
     * @example
     * // Get one LightningTalk
     * const lightningTalk = await prisma.lightningTalk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LightningTalkFindFirstOrThrowArgs>(args?: SelectSubset<T, LightningTalkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LightningTalks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LightningTalks
     * const lightningTalks = await prisma.lightningTalk.findMany()
     * 
     * // Get first 10 LightningTalks
     * const lightningTalks = await prisma.lightningTalk.findMany({ take: 10 })
     * 
     * // Only select the `exhibitId`
     * const lightningTalkWithExhibitIdOnly = await prisma.lightningTalk.findMany({ select: { exhibitId: true } })
     * 
     */
    findMany<T extends LightningTalkFindManyArgs>(args?: SelectSubset<T, LightningTalkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LightningTalk.
     * @param {LightningTalkCreateArgs} args - Arguments to create a LightningTalk.
     * @example
     * // Create one LightningTalk
     * const LightningTalk = await prisma.lightningTalk.create({
     *   data: {
     *     // ... data to create a LightningTalk
     *   }
     * })
     * 
     */
    create<T extends LightningTalkCreateArgs>(args: SelectSubset<T, LightningTalkCreateArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LightningTalks.
     * @param {LightningTalkCreateManyArgs} args - Arguments to create many LightningTalks.
     * @example
     * // Create many LightningTalks
     * const lightningTalk = await prisma.lightningTalk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LightningTalkCreateManyArgs>(args?: SelectSubset<T, LightningTalkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LightningTalks and returns the data saved in the database.
     * @param {LightningTalkCreateManyAndReturnArgs} args - Arguments to create many LightningTalks.
     * @example
     * // Create many LightningTalks
     * const lightningTalk = await prisma.lightningTalk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LightningTalks and only return the `exhibitId`
     * const lightningTalkWithExhibitIdOnly = await prisma.lightningTalk.createManyAndReturn({ 
     *   select: { exhibitId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LightningTalkCreateManyAndReturnArgs>(args?: SelectSubset<T, LightningTalkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LightningTalk.
     * @param {LightningTalkDeleteArgs} args - Arguments to delete one LightningTalk.
     * @example
     * // Delete one LightningTalk
     * const LightningTalk = await prisma.lightningTalk.delete({
     *   where: {
     *     // ... filter to delete one LightningTalk
     *   }
     * })
     * 
     */
    delete<T extends LightningTalkDeleteArgs>(args: SelectSubset<T, LightningTalkDeleteArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LightningTalk.
     * @param {LightningTalkUpdateArgs} args - Arguments to update one LightningTalk.
     * @example
     * // Update one LightningTalk
     * const lightningTalk = await prisma.lightningTalk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LightningTalkUpdateArgs>(args: SelectSubset<T, LightningTalkUpdateArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LightningTalks.
     * @param {LightningTalkDeleteManyArgs} args - Arguments to filter LightningTalks to delete.
     * @example
     * // Delete a few LightningTalks
     * const { count } = await prisma.lightningTalk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LightningTalkDeleteManyArgs>(args?: SelectSubset<T, LightningTalkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LightningTalks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LightningTalks
     * const lightningTalk = await prisma.lightningTalk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LightningTalkUpdateManyArgs>(args: SelectSubset<T, LightningTalkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LightningTalk.
     * @param {LightningTalkUpsertArgs} args - Arguments to update or create a LightningTalk.
     * @example
     * // Update or create a LightningTalk
     * const lightningTalk = await prisma.lightningTalk.upsert({
     *   create: {
     *     // ... data to create a LightningTalk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LightningTalk we want to update
     *   }
     * })
     */
    upsert<T extends LightningTalkUpsertArgs>(args: SelectSubset<T, LightningTalkUpsertArgs<ExtArgs>>): Prisma__LightningTalkClient<$Result.GetResult<Prisma.$LightningTalkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LightningTalks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkCountArgs} args - Arguments to filter LightningTalks to count.
     * @example
     * // Count the number of LightningTalks
     * const count = await prisma.lightningTalk.count({
     *   where: {
     *     // ... the filter for the LightningTalks we want to count
     *   }
     * })
    **/
    count<T extends LightningTalkCountArgs>(
      args?: Subset<T, LightningTalkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LightningTalkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LightningTalk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LightningTalkAggregateArgs>(args: Subset<T, LightningTalkAggregateArgs>): Prisma.PrismaPromise<GetLightningTalkAggregateType<T>>

    /**
     * Group by LightningTalk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LightningTalkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LightningTalkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LightningTalkGroupByArgs['orderBy'] }
        : { orderBy?: LightningTalkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LightningTalkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLightningTalkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LightningTalk model
   */
  readonly fields: LightningTalkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LightningTalk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LightningTalkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exhibit<T extends ExhibitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExhibitDefaultArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LightningTalk model
   */ 
  interface LightningTalkFieldRefs {
    readonly exhibitId: FieldRef<"LightningTalk", 'String'>
    readonly startTime: FieldRef<"LightningTalk", 'DateTime'>
    readonly duration: FieldRef<"LightningTalk", 'Int'>
    readonly slideUrl: FieldRef<"LightningTalk", 'String'>
    readonly createdAt: FieldRef<"LightningTalk", 'DateTime'>
    readonly updatedAt: FieldRef<"LightningTalk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LightningTalk findUnique
   */
  export type LightningTalkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter, which LightningTalk to fetch.
     */
    where: LightningTalkWhereUniqueInput
  }

  /**
   * LightningTalk findUniqueOrThrow
   */
  export type LightningTalkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter, which LightningTalk to fetch.
     */
    where: LightningTalkWhereUniqueInput
  }

  /**
   * LightningTalk findFirst
   */
  export type LightningTalkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter, which LightningTalk to fetch.
     */
    where?: LightningTalkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LightningTalks to fetch.
     */
    orderBy?: LightningTalkOrderByWithRelationInput | LightningTalkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LightningTalks.
     */
    cursor?: LightningTalkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LightningTalks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LightningTalks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LightningTalks.
     */
    distinct?: LightningTalkScalarFieldEnum | LightningTalkScalarFieldEnum[]
  }

  /**
   * LightningTalk findFirstOrThrow
   */
  export type LightningTalkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter, which LightningTalk to fetch.
     */
    where?: LightningTalkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LightningTalks to fetch.
     */
    orderBy?: LightningTalkOrderByWithRelationInput | LightningTalkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LightningTalks.
     */
    cursor?: LightningTalkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LightningTalks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LightningTalks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LightningTalks.
     */
    distinct?: LightningTalkScalarFieldEnum | LightningTalkScalarFieldEnum[]
  }

  /**
   * LightningTalk findMany
   */
  export type LightningTalkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter, which LightningTalks to fetch.
     */
    where?: LightningTalkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LightningTalks to fetch.
     */
    orderBy?: LightningTalkOrderByWithRelationInput | LightningTalkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LightningTalks.
     */
    cursor?: LightningTalkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LightningTalks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LightningTalks.
     */
    skip?: number
    distinct?: LightningTalkScalarFieldEnum | LightningTalkScalarFieldEnum[]
  }

  /**
   * LightningTalk create
   */
  export type LightningTalkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * The data needed to create a LightningTalk.
     */
    data: XOR<LightningTalkCreateInput, LightningTalkUncheckedCreateInput>
  }

  /**
   * LightningTalk createMany
   */
  export type LightningTalkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LightningTalks.
     */
    data: LightningTalkCreateManyInput | LightningTalkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LightningTalk createManyAndReturn
   */
  export type LightningTalkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LightningTalks.
     */
    data: LightningTalkCreateManyInput | LightningTalkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LightningTalk update
   */
  export type LightningTalkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * The data needed to update a LightningTalk.
     */
    data: XOR<LightningTalkUpdateInput, LightningTalkUncheckedUpdateInput>
    /**
     * Choose, which LightningTalk to update.
     */
    where: LightningTalkWhereUniqueInput
  }

  /**
   * LightningTalk updateMany
   */
  export type LightningTalkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LightningTalks.
     */
    data: XOR<LightningTalkUpdateManyMutationInput, LightningTalkUncheckedUpdateManyInput>
    /**
     * Filter which LightningTalks to update
     */
    where?: LightningTalkWhereInput
  }

  /**
   * LightningTalk upsert
   */
  export type LightningTalkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * The filter to search for the LightningTalk to update in case it exists.
     */
    where: LightningTalkWhereUniqueInput
    /**
     * In case the LightningTalk found by the `where` argument doesn't exist, create a new LightningTalk with this data.
     */
    create: XOR<LightningTalkCreateInput, LightningTalkUncheckedCreateInput>
    /**
     * In case the LightningTalk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LightningTalkUpdateInput, LightningTalkUncheckedUpdateInput>
  }

  /**
   * LightningTalk delete
   */
  export type LightningTalkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
    /**
     * Filter which LightningTalk to delete.
     */
    where: LightningTalkWhereUniqueInput
  }

  /**
   * LightningTalk deleteMany
   */
  export type LightningTalkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LightningTalks to delete
     */
    where?: LightningTalkWhereInput
  }

  /**
   * LightningTalk without action
   */
  export type LightningTalkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LightningTalk
     */
    select?: LightningTalkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LightningTalkInclude<ExtArgs> | null
  }


  /**
   * Model MemberEvent
   */

  export type AggregateMemberEvent = {
    _count: MemberEventCountAggregateOutputType | null
    _min: MemberEventMinAggregateOutputType | null
    _max: MemberEventMaxAggregateOutputType | null
  }

  export type MemberEventMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    eventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberEventMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    eventId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberEventCountAggregateOutputType = {
    id: number
    memberId: number
    eventId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberEventMinAggregateInputType = {
    id?: true
    memberId?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberEventMaxAggregateInputType = {
    id?: true
    memberId?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberEventCountAggregateInputType = {
    id?: true
    memberId?: true
    eventId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberEvent to aggregate.
     */
    where?: MemberEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberEvents to fetch.
     */
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberEvents
    **/
    _count?: true | MemberEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberEventMaxAggregateInputType
  }

  export type GetMemberEventAggregateType<T extends MemberEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberEvent[P]>
      : GetScalarType<T[P], AggregateMemberEvent[P]>
  }




  export type MemberEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberEventWhereInput
    orderBy?: MemberEventOrderByWithAggregationInput | MemberEventOrderByWithAggregationInput[]
    by: MemberEventScalarFieldEnum[] | MemberEventScalarFieldEnum
    having?: MemberEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberEventCountAggregateInputType | true
    _min?: MemberEventMinAggregateInputType
    _max?: MemberEventMaxAggregateInputType
  }

  export type MemberEventGroupByOutputType = {
    id: string
    memberId: string
    eventId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberEventCountAggregateOutputType | null
    _min: MemberEventMinAggregateOutputType | null
    _max: MemberEventMaxAggregateOutputType | null
  }

  type GetMemberEventGroupByPayload<T extends MemberEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberEventGroupByOutputType[P]>
            : GetScalarType<T[P], MemberEventGroupByOutputType[P]>
        }
      >
    >


  export type MemberEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberEvent"]>

  export type MemberEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberEvent"]>

  export type MemberEventSelectScalar = {
    id?: boolean
    memberId?: boolean
    eventId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type MemberEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $MemberEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberEvent"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      eventId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberEvent"]>
    composites: {}
  }

  type MemberEventGetPayload<S extends boolean | null | undefined | MemberEventDefaultArgs> = $Result.GetResult<Prisma.$MemberEventPayload, S>

  type MemberEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberEventCountAggregateInputType | true
    }

  export interface MemberEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberEvent'], meta: { name: 'MemberEvent' } }
    /**
     * Find zero or one MemberEvent that matches the filter.
     * @param {MemberEventFindUniqueArgs} args - Arguments to find a MemberEvent
     * @example
     * // Get one MemberEvent
     * const memberEvent = await prisma.memberEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberEventFindUniqueArgs>(args: SelectSubset<T, MemberEventFindUniqueArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MemberEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberEventFindUniqueOrThrowArgs} args - Arguments to find a MemberEvent
     * @example
     * // Get one MemberEvent
     * const memberEvent = await prisma.memberEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberEventFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MemberEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventFindFirstArgs} args - Arguments to find a MemberEvent
     * @example
     * // Get one MemberEvent
     * const memberEvent = await prisma.memberEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberEventFindFirstArgs>(args?: SelectSubset<T, MemberEventFindFirstArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MemberEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventFindFirstOrThrowArgs} args - Arguments to find a MemberEvent
     * @example
     * // Get one MemberEvent
     * const memberEvent = await prisma.memberEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberEventFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MemberEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberEvents
     * const memberEvents = await prisma.memberEvent.findMany()
     * 
     * // Get first 10 MemberEvents
     * const memberEvents = await prisma.memberEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberEventWithIdOnly = await prisma.memberEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberEventFindManyArgs>(args?: SelectSubset<T, MemberEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MemberEvent.
     * @param {MemberEventCreateArgs} args - Arguments to create a MemberEvent.
     * @example
     * // Create one MemberEvent
     * const MemberEvent = await prisma.memberEvent.create({
     *   data: {
     *     // ... data to create a MemberEvent
     *   }
     * })
     * 
     */
    create<T extends MemberEventCreateArgs>(args: SelectSubset<T, MemberEventCreateArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MemberEvents.
     * @param {MemberEventCreateManyArgs} args - Arguments to create many MemberEvents.
     * @example
     * // Create many MemberEvents
     * const memberEvent = await prisma.memberEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberEventCreateManyArgs>(args?: SelectSubset<T, MemberEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberEvents and returns the data saved in the database.
     * @param {MemberEventCreateManyAndReturnArgs} args - Arguments to create many MemberEvents.
     * @example
     * // Create many MemberEvents
     * const memberEvent = await prisma.memberEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberEvents and only return the `id`
     * const memberEventWithIdOnly = await prisma.memberEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberEventCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MemberEvent.
     * @param {MemberEventDeleteArgs} args - Arguments to delete one MemberEvent.
     * @example
     * // Delete one MemberEvent
     * const MemberEvent = await prisma.memberEvent.delete({
     *   where: {
     *     // ... filter to delete one MemberEvent
     *   }
     * })
     * 
     */
    delete<T extends MemberEventDeleteArgs>(args: SelectSubset<T, MemberEventDeleteArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MemberEvent.
     * @param {MemberEventUpdateArgs} args - Arguments to update one MemberEvent.
     * @example
     * // Update one MemberEvent
     * const memberEvent = await prisma.memberEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberEventUpdateArgs>(args: SelectSubset<T, MemberEventUpdateArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MemberEvents.
     * @param {MemberEventDeleteManyArgs} args - Arguments to filter MemberEvents to delete.
     * @example
     * // Delete a few MemberEvents
     * const { count } = await prisma.memberEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberEventDeleteManyArgs>(args?: SelectSubset<T, MemberEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberEvents
     * const memberEvent = await prisma.memberEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberEventUpdateManyArgs>(args: SelectSubset<T, MemberEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MemberEvent.
     * @param {MemberEventUpsertArgs} args - Arguments to update or create a MemberEvent.
     * @example
     * // Update or create a MemberEvent
     * const memberEvent = await prisma.memberEvent.upsert({
     *   create: {
     *     // ... data to create a MemberEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberEvent we want to update
     *   }
     * })
     */
    upsert<T extends MemberEventUpsertArgs>(args: SelectSubset<T, MemberEventUpsertArgs<ExtArgs>>): Prisma__MemberEventClient<$Result.GetResult<Prisma.$MemberEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MemberEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventCountArgs} args - Arguments to filter MemberEvents to count.
     * @example
     * // Count the number of MemberEvents
     * const count = await prisma.memberEvent.count({
     *   where: {
     *     // ... the filter for the MemberEvents we want to count
     *   }
     * })
    **/
    count<T extends MemberEventCountArgs>(
      args?: Subset<T, MemberEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberEventAggregateArgs>(args: Subset<T, MemberEventAggregateArgs>): Prisma.PrismaPromise<GetMemberEventAggregateType<T>>

    /**
     * Group by MemberEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberEventGroupByArgs['orderBy'] }
        : { orderBy?: MemberEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberEvent model
   */
  readonly fields: MemberEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberEvent model
   */ 
  interface MemberEventFieldRefs {
    readonly id: FieldRef<"MemberEvent", 'String'>
    readonly memberId: FieldRef<"MemberEvent", 'String'>
    readonly eventId: FieldRef<"MemberEvent", 'String'>
    readonly createdAt: FieldRef<"MemberEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberEvent findUnique
   */
  export type MemberEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter, which MemberEvent to fetch.
     */
    where: MemberEventWhereUniqueInput
  }

  /**
   * MemberEvent findUniqueOrThrow
   */
  export type MemberEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter, which MemberEvent to fetch.
     */
    where: MemberEventWhereUniqueInput
  }

  /**
   * MemberEvent findFirst
   */
  export type MemberEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter, which MemberEvent to fetch.
     */
    where?: MemberEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberEvents to fetch.
     */
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberEvents.
     */
    cursor?: MemberEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberEvents.
     */
    distinct?: MemberEventScalarFieldEnum | MemberEventScalarFieldEnum[]
  }

  /**
   * MemberEvent findFirstOrThrow
   */
  export type MemberEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter, which MemberEvent to fetch.
     */
    where?: MemberEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberEvents to fetch.
     */
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberEvents.
     */
    cursor?: MemberEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberEvents.
     */
    distinct?: MemberEventScalarFieldEnum | MemberEventScalarFieldEnum[]
  }

  /**
   * MemberEvent findMany
   */
  export type MemberEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter, which MemberEvents to fetch.
     */
    where?: MemberEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberEvents to fetch.
     */
    orderBy?: MemberEventOrderByWithRelationInput | MemberEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberEvents.
     */
    cursor?: MemberEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberEvents.
     */
    skip?: number
    distinct?: MemberEventScalarFieldEnum | MemberEventScalarFieldEnum[]
  }

  /**
   * MemberEvent create
   */
  export type MemberEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberEvent.
     */
    data: XOR<MemberEventCreateInput, MemberEventUncheckedCreateInput>
  }

  /**
   * MemberEvent createMany
   */
  export type MemberEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberEvents.
     */
    data: MemberEventCreateManyInput | MemberEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberEvent createManyAndReturn
   */
  export type MemberEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MemberEvents.
     */
    data: MemberEventCreateManyInput | MemberEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberEvent update
   */
  export type MemberEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberEvent.
     */
    data: XOR<MemberEventUpdateInput, MemberEventUncheckedUpdateInput>
    /**
     * Choose, which MemberEvent to update.
     */
    where: MemberEventWhereUniqueInput
  }

  /**
   * MemberEvent updateMany
   */
  export type MemberEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberEvents.
     */
    data: XOR<MemberEventUpdateManyMutationInput, MemberEventUncheckedUpdateManyInput>
    /**
     * Filter which MemberEvents to update
     */
    where?: MemberEventWhereInput
  }

  /**
   * MemberEvent upsert
   */
  export type MemberEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberEvent to update in case it exists.
     */
    where: MemberEventWhereUniqueInput
    /**
     * In case the MemberEvent found by the `where` argument doesn't exist, create a new MemberEvent with this data.
     */
    create: XOR<MemberEventCreateInput, MemberEventUncheckedCreateInput>
    /**
     * In case the MemberEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberEventUpdateInput, MemberEventUncheckedUpdateInput>
  }

  /**
   * MemberEvent delete
   */
  export type MemberEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
    /**
     * Filter which MemberEvent to delete.
     */
    where: MemberEventWhereUniqueInput
  }

  /**
   * MemberEvent deleteMany
   */
  export type MemberEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberEvents to delete
     */
    where?: MemberEventWhereInput
  }

  /**
   * MemberEvent without action
   */
  export type MemberEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberEvent
     */
    select?: MemberEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberEventInclude<ExtArgs> | null
  }


  /**
   * Model MemberExhibit
   */

  export type AggregateMemberExhibit = {
    _count: MemberExhibitCountAggregateOutputType | null
    _min: MemberExhibitMinAggregateOutputType | null
    _max: MemberExhibitMaxAggregateOutputType | null
  }

  export type MemberExhibitMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    exhibitId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberExhibitMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    exhibitId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberExhibitCountAggregateOutputType = {
    id: number
    memberId: number
    exhibitId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberExhibitMinAggregateInputType = {
    id?: true
    memberId?: true
    exhibitId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberExhibitMaxAggregateInputType = {
    id?: true
    memberId?: true
    exhibitId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberExhibitCountAggregateInputType = {
    id?: true
    memberId?: true
    exhibitId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberExhibitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberExhibit to aggregate.
     */
    where?: MemberExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExhibits to fetch.
     */
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberExhibits
    **/
    _count?: true | MemberExhibitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberExhibitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberExhibitMaxAggregateInputType
  }

  export type GetMemberExhibitAggregateType<T extends MemberExhibitAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberExhibit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberExhibit[P]>
      : GetScalarType<T[P], AggregateMemberExhibit[P]>
  }




  export type MemberExhibitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberExhibitWhereInput
    orderBy?: MemberExhibitOrderByWithAggregationInput | MemberExhibitOrderByWithAggregationInput[]
    by: MemberExhibitScalarFieldEnum[] | MemberExhibitScalarFieldEnum
    having?: MemberExhibitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberExhibitCountAggregateInputType | true
    _min?: MemberExhibitMinAggregateInputType
    _max?: MemberExhibitMaxAggregateInputType
  }

  export type MemberExhibitGroupByOutputType = {
    id: string
    memberId: string
    exhibitId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberExhibitCountAggregateOutputType | null
    _min: MemberExhibitMinAggregateOutputType | null
    _max: MemberExhibitMaxAggregateOutputType | null
  }

  type GetMemberExhibitGroupByPayload<T extends MemberExhibitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberExhibitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberExhibitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberExhibitGroupByOutputType[P]>
            : GetScalarType<T[P], MemberExhibitGroupByOutputType[P]>
        }
      >
    >


  export type MemberExhibitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    exhibitId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberExhibit"]>

  export type MemberExhibitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    exhibitId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberExhibit"]>

  export type MemberExhibitSelectScalar = {
    id?: boolean
    memberId?: boolean
    exhibitId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberExhibitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }
  export type MemberExhibitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    exhibit?: boolean | ExhibitDefaultArgs<ExtArgs>
  }

  export type $MemberExhibitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberExhibit"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      exhibit: Prisma.$ExhibitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      exhibitId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberExhibit"]>
    composites: {}
  }

  type MemberExhibitGetPayload<S extends boolean | null | undefined | MemberExhibitDefaultArgs> = $Result.GetResult<Prisma.$MemberExhibitPayload, S>

  type MemberExhibitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberExhibitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberExhibitCountAggregateInputType | true
    }

  export interface MemberExhibitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberExhibit'], meta: { name: 'MemberExhibit' } }
    /**
     * Find zero or one MemberExhibit that matches the filter.
     * @param {MemberExhibitFindUniqueArgs} args - Arguments to find a MemberExhibit
     * @example
     * // Get one MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberExhibitFindUniqueArgs>(args: SelectSubset<T, MemberExhibitFindUniqueArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MemberExhibit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MemberExhibitFindUniqueOrThrowArgs} args - Arguments to find a MemberExhibit
     * @example
     * // Get one MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberExhibitFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberExhibitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MemberExhibit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitFindFirstArgs} args - Arguments to find a MemberExhibit
     * @example
     * // Get one MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberExhibitFindFirstArgs>(args?: SelectSubset<T, MemberExhibitFindFirstArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MemberExhibit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitFindFirstOrThrowArgs} args - Arguments to find a MemberExhibit
     * @example
     * // Get one MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberExhibitFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberExhibitFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MemberExhibits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberExhibits
     * const memberExhibits = await prisma.memberExhibit.findMany()
     * 
     * // Get first 10 MemberExhibits
     * const memberExhibits = await prisma.memberExhibit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberExhibitWithIdOnly = await prisma.memberExhibit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberExhibitFindManyArgs>(args?: SelectSubset<T, MemberExhibitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MemberExhibit.
     * @param {MemberExhibitCreateArgs} args - Arguments to create a MemberExhibit.
     * @example
     * // Create one MemberExhibit
     * const MemberExhibit = await prisma.memberExhibit.create({
     *   data: {
     *     // ... data to create a MemberExhibit
     *   }
     * })
     * 
     */
    create<T extends MemberExhibitCreateArgs>(args: SelectSubset<T, MemberExhibitCreateArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MemberExhibits.
     * @param {MemberExhibitCreateManyArgs} args - Arguments to create many MemberExhibits.
     * @example
     * // Create many MemberExhibits
     * const memberExhibit = await prisma.memberExhibit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberExhibitCreateManyArgs>(args?: SelectSubset<T, MemberExhibitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberExhibits and returns the data saved in the database.
     * @param {MemberExhibitCreateManyAndReturnArgs} args - Arguments to create many MemberExhibits.
     * @example
     * // Create many MemberExhibits
     * const memberExhibit = await prisma.memberExhibit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberExhibits and only return the `id`
     * const memberExhibitWithIdOnly = await prisma.memberExhibit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberExhibitCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberExhibitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MemberExhibit.
     * @param {MemberExhibitDeleteArgs} args - Arguments to delete one MemberExhibit.
     * @example
     * // Delete one MemberExhibit
     * const MemberExhibit = await prisma.memberExhibit.delete({
     *   where: {
     *     // ... filter to delete one MemberExhibit
     *   }
     * })
     * 
     */
    delete<T extends MemberExhibitDeleteArgs>(args: SelectSubset<T, MemberExhibitDeleteArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MemberExhibit.
     * @param {MemberExhibitUpdateArgs} args - Arguments to update one MemberExhibit.
     * @example
     * // Update one MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberExhibitUpdateArgs>(args: SelectSubset<T, MemberExhibitUpdateArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MemberExhibits.
     * @param {MemberExhibitDeleteManyArgs} args - Arguments to filter MemberExhibits to delete.
     * @example
     * // Delete a few MemberExhibits
     * const { count } = await prisma.memberExhibit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberExhibitDeleteManyArgs>(args?: SelectSubset<T, MemberExhibitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberExhibits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberExhibits
     * const memberExhibit = await prisma.memberExhibit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberExhibitUpdateManyArgs>(args: SelectSubset<T, MemberExhibitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MemberExhibit.
     * @param {MemberExhibitUpsertArgs} args - Arguments to update or create a MemberExhibit.
     * @example
     * // Update or create a MemberExhibit
     * const memberExhibit = await prisma.memberExhibit.upsert({
     *   create: {
     *     // ... data to create a MemberExhibit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberExhibit we want to update
     *   }
     * })
     */
    upsert<T extends MemberExhibitUpsertArgs>(args: SelectSubset<T, MemberExhibitUpsertArgs<ExtArgs>>): Prisma__MemberExhibitClient<$Result.GetResult<Prisma.$MemberExhibitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MemberExhibits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitCountArgs} args - Arguments to filter MemberExhibits to count.
     * @example
     * // Count the number of MemberExhibits
     * const count = await prisma.memberExhibit.count({
     *   where: {
     *     // ... the filter for the MemberExhibits we want to count
     *   }
     * })
    **/
    count<T extends MemberExhibitCountArgs>(
      args?: Subset<T, MemberExhibitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberExhibitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberExhibit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberExhibitAggregateArgs>(args: Subset<T, MemberExhibitAggregateArgs>): Prisma.PrismaPromise<GetMemberExhibitAggregateType<T>>

    /**
     * Group by MemberExhibit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExhibitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberExhibitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberExhibitGroupByArgs['orderBy'] }
        : { orderBy?: MemberExhibitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberExhibitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberExhibitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberExhibit model
   */
  readonly fields: MemberExhibitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberExhibit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberExhibitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    exhibit<T extends ExhibitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExhibitDefaultArgs<ExtArgs>>): Prisma__ExhibitClient<$Result.GetResult<Prisma.$ExhibitPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberExhibit model
   */ 
  interface MemberExhibitFieldRefs {
    readonly id: FieldRef<"MemberExhibit", 'String'>
    readonly memberId: FieldRef<"MemberExhibit", 'String'>
    readonly exhibitId: FieldRef<"MemberExhibit", 'String'>
    readonly createdAt: FieldRef<"MemberExhibit", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberExhibit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberExhibit findUnique
   */
  export type MemberExhibitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter, which MemberExhibit to fetch.
     */
    where: MemberExhibitWhereUniqueInput
  }

  /**
   * MemberExhibit findUniqueOrThrow
   */
  export type MemberExhibitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter, which MemberExhibit to fetch.
     */
    where: MemberExhibitWhereUniqueInput
  }

  /**
   * MemberExhibit findFirst
   */
  export type MemberExhibitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter, which MemberExhibit to fetch.
     */
    where?: MemberExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExhibits to fetch.
     */
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberExhibits.
     */
    cursor?: MemberExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberExhibits.
     */
    distinct?: MemberExhibitScalarFieldEnum | MemberExhibitScalarFieldEnum[]
  }

  /**
   * MemberExhibit findFirstOrThrow
   */
  export type MemberExhibitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter, which MemberExhibit to fetch.
     */
    where?: MemberExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExhibits to fetch.
     */
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberExhibits.
     */
    cursor?: MemberExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExhibits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberExhibits.
     */
    distinct?: MemberExhibitScalarFieldEnum | MemberExhibitScalarFieldEnum[]
  }

  /**
   * MemberExhibit findMany
   */
  export type MemberExhibitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter, which MemberExhibits to fetch.
     */
    where?: MemberExhibitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExhibits to fetch.
     */
    orderBy?: MemberExhibitOrderByWithRelationInput | MemberExhibitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberExhibits.
     */
    cursor?: MemberExhibitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExhibits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExhibits.
     */
    skip?: number
    distinct?: MemberExhibitScalarFieldEnum | MemberExhibitScalarFieldEnum[]
  }

  /**
   * MemberExhibit create
   */
  export type MemberExhibitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberExhibit.
     */
    data: XOR<MemberExhibitCreateInput, MemberExhibitUncheckedCreateInput>
  }

  /**
   * MemberExhibit createMany
   */
  export type MemberExhibitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberExhibits.
     */
    data: MemberExhibitCreateManyInput | MemberExhibitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberExhibit createManyAndReturn
   */
  export type MemberExhibitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MemberExhibits.
     */
    data: MemberExhibitCreateManyInput | MemberExhibitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberExhibit update
   */
  export type MemberExhibitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberExhibit.
     */
    data: XOR<MemberExhibitUpdateInput, MemberExhibitUncheckedUpdateInput>
    /**
     * Choose, which MemberExhibit to update.
     */
    where: MemberExhibitWhereUniqueInput
  }

  /**
   * MemberExhibit updateMany
   */
  export type MemberExhibitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberExhibits.
     */
    data: XOR<MemberExhibitUpdateManyMutationInput, MemberExhibitUncheckedUpdateManyInput>
    /**
     * Filter which MemberExhibits to update
     */
    where?: MemberExhibitWhereInput
  }

  /**
   * MemberExhibit upsert
   */
  export type MemberExhibitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberExhibit to update in case it exists.
     */
    where: MemberExhibitWhereUniqueInput
    /**
     * In case the MemberExhibit found by the `where` argument doesn't exist, create a new MemberExhibit with this data.
     */
    create: XOR<MemberExhibitCreateInput, MemberExhibitUncheckedCreateInput>
    /**
     * In case the MemberExhibit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberExhibitUpdateInput, MemberExhibitUncheckedUpdateInput>
  }

  /**
   * MemberExhibit delete
   */
  export type MemberExhibitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
    /**
     * Filter which MemberExhibit to delete.
     */
    where: MemberExhibitWhereUniqueInput
  }

  /**
   * MemberExhibit deleteMany
   */
  export type MemberExhibitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberExhibits to delete
     */
    where?: MemberExhibitWhereInput
  }

  /**
   * MemberExhibit without action
   */
  export type MemberExhibitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExhibit
     */
    select?: MemberExhibitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExhibitInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MemberScalarFieldEnum: {
    id: 'id',
    name: 'name',
    studentId: 'studentId',
    department: 'department',
    email: 'email',
    personalEmail: 'personalEmail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const DiscordAccountScalarFieldEnum: {
    id: 'id',
    nickName: 'nickName',
    memberId: 'memberId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DiscordAccountScalarFieldEnum = (typeof DiscordAccountScalarFieldEnum)[keyof typeof DiscordAccountScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ExhibitScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    markdownContent: 'markdownContent',
    url: 'url',
    eventId: 'eventId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExhibitScalarFieldEnum = (typeof ExhibitScalarFieldEnum)[keyof typeof ExhibitScalarFieldEnum]


  export const LightningTalkScalarFieldEnum: {
    exhibitId: 'exhibitId',
    startTime: 'startTime',
    duration: 'duration',
    slideUrl: 'slideUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LightningTalkScalarFieldEnum = (typeof LightningTalkScalarFieldEnum)[keyof typeof LightningTalkScalarFieldEnum]


  export const MemberEventScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    eventId: 'eventId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberEventScalarFieldEnum = (typeof MemberEventScalarFieldEnum)[keyof typeof MemberEventScalarFieldEnum]


  export const MemberExhibitScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    exhibitId: 'exhibitId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberExhibitScalarFieldEnum = (typeof MemberExhibitScalarFieldEnum)[keyof typeof MemberExhibitScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    name?: StringFilter<"Member"> | string
    studentId?: StringFilter<"Member"> | string
    department?: StringFilter<"Member"> | string
    email?: StringFilter<"Member"> | string
    personalEmail?: StringNullableFilter<"Member"> | string | null
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    discordAccounts?: DiscordAccountListRelationFilter
    events?: MemberEventListRelationFilter
    exhibits?: MemberExhibitListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    email?: SortOrder
    personalEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    discordAccounts?: DiscordAccountOrderByRelationAggregateInput
    events?: MemberEventOrderByRelationAggregateInput
    exhibits?: MemberExhibitOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    name?: StringFilter<"Member"> | string
    studentId?: StringFilter<"Member"> | string
    department?: StringFilter<"Member"> | string
    personalEmail?: StringNullableFilter<"Member"> | string | null
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    discordAccounts?: DiscordAccountListRelationFilter
    events?: MemberEventListRelationFilter
    exhibits?: MemberExhibitListRelationFilter
  }, "id" | "email">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    email?: SortOrder
    personalEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    name?: StringWithAggregatesFilter<"Member"> | string
    studentId?: StringWithAggregatesFilter<"Member"> | string
    department?: StringWithAggregatesFilter<"Member"> | string
    email?: StringWithAggregatesFilter<"Member"> | string
    personalEmail?: StringNullableWithAggregatesFilter<"Member"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type DiscordAccountWhereInput = {
    AND?: DiscordAccountWhereInput | DiscordAccountWhereInput[]
    OR?: DiscordAccountWhereInput[]
    NOT?: DiscordAccountWhereInput | DiscordAccountWhereInput[]
    id?: StringFilter<"DiscordAccount"> | string
    nickName?: StringFilter<"DiscordAccount"> | string
    memberId?: StringFilter<"DiscordAccount"> | string
    createdAt?: DateTimeFilter<"DiscordAccount"> | Date | string
    updatedAt?: DateTimeFilter<"DiscordAccount"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
  }

  export type DiscordAccountOrderByWithRelationInput = {
    id?: SortOrder
    nickName?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
  }

  export type DiscordAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DiscordAccountWhereInput | DiscordAccountWhereInput[]
    OR?: DiscordAccountWhereInput[]
    NOT?: DiscordAccountWhereInput | DiscordAccountWhereInput[]
    nickName?: StringFilter<"DiscordAccount"> | string
    memberId?: StringFilter<"DiscordAccount"> | string
    createdAt?: DateTimeFilter<"DiscordAccount"> | Date | string
    updatedAt?: DateTimeFilter<"DiscordAccount"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
  }, "id">

  export type DiscordAccountOrderByWithAggregationInput = {
    id?: SortOrder
    nickName?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DiscordAccountCountOrderByAggregateInput
    _max?: DiscordAccountMaxOrderByAggregateInput
    _min?: DiscordAccountMinOrderByAggregateInput
  }

  export type DiscordAccountScalarWhereWithAggregatesInput = {
    AND?: DiscordAccountScalarWhereWithAggregatesInput | DiscordAccountScalarWhereWithAggregatesInput[]
    OR?: DiscordAccountScalarWhereWithAggregatesInput[]
    NOT?: DiscordAccountScalarWhereWithAggregatesInput | DiscordAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DiscordAccount"> | string
    nickName?: StringWithAggregatesFilter<"DiscordAccount"> | string
    memberId?: StringWithAggregatesFilter<"DiscordAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DiscordAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DiscordAccount"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    name?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    members?: MemberEventListRelationFilter
    exhibits?: ExhibitListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: MemberEventOrderByRelationAggregateInput
    exhibits?: ExhibitOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    members?: MemberEventListRelationFilter
    exhibits?: ExhibitListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    name?: StringWithAggregatesFilter<"Event"> | string
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type ExhibitWhereInput = {
    AND?: ExhibitWhereInput | ExhibitWhereInput[]
    OR?: ExhibitWhereInput[]
    NOT?: ExhibitWhereInput | ExhibitWhereInput[]
    id?: StringFilter<"Exhibit"> | string
    name?: StringFilter<"Exhibit"> | string
    description?: StringNullableFilter<"Exhibit"> | string | null
    markdownContent?: StringNullableFilter<"Exhibit"> | string | null
    url?: StringNullableFilter<"Exhibit"> | string | null
    eventId?: StringFilter<"Exhibit"> | string
    createdAt?: DateTimeFilter<"Exhibit"> | Date | string
    updatedAt?: DateTimeFilter<"Exhibit"> | Date | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    members?: MemberExhibitListRelationFilter
    lightningTalk?: XOR<LightningTalkNullableRelationFilter, LightningTalkWhereInput> | null
  }

  export type ExhibitOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    markdownContent?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
    members?: MemberExhibitOrderByRelationAggregateInput
    lightningTalk?: LightningTalkOrderByWithRelationInput
  }

  export type ExhibitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExhibitWhereInput | ExhibitWhereInput[]
    OR?: ExhibitWhereInput[]
    NOT?: ExhibitWhereInput | ExhibitWhereInput[]
    name?: StringFilter<"Exhibit"> | string
    description?: StringNullableFilter<"Exhibit"> | string | null
    markdownContent?: StringNullableFilter<"Exhibit"> | string | null
    url?: StringNullableFilter<"Exhibit"> | string | null
    eventId?: StringFilter<"Exhibit"> | string
    createdAt?: DateTimeFilter<"Exhibit"> | Date | string
    updatedAt?: DateTimeFilter<"Exhibit"> | Date | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    members?: MemberExhibitListRelationFilter
    lightningTalk?: XOR<LightningTalkNullableRelationFilter, LightningTalkWhereInput> | null
  }, "id">

  export type ExhibitOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    markdownContent?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExhibitCountOrderByAggregateInput
    _max?: ExhibitMaxOrderByAggregateInput
    _min?: ExhibitMinOrderByAggregateInput
  }

  export type ExhibitScalarWhereWithAggregatesInput = {
    AND?: ExhibitScalarWhereWithAggregatesInput | ExhibitScalarWhereWithAggregatesInput[]
    OR?: ExhibitScalarWhereWithAggregatesInput[]
    NOT?: ExhibitScalarWhereWithAggregatesInput | ExhibitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exhibit"> | string
    name?: StringWithAggregatesFilter<"Exhibit"> | string
    description?: StringNullableWithAggregatesFilter<"Exhibit"> | string | null
    markdownContent?: StringNullableWithAggregatesFilter<"Exhibit"> | string | null
    url?: StringNullableWithAggregatesFilter<"Exhibit"> | string | null
    eventId?: StringWithAggregatesFilter<"Exhibit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Exhibit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exhibit"> | Date | string
  }

  export type LightningTalkWhereInput = {
    AND?: LightningTalkWhereInput | LightningTalkWhereInput[]
    OR?: LightningTalkWhereInput[]
    NOT?: LightningTalkWhereInput | LightningTalkWhereInput[]
    exhibitId?: StringFilter<"LightningTalk"> | string
    startTime?: DateTimeFilter<"LightningTalk"> | Date | string
    duration?: IntFilter<"LightningTalk"> | number
    slideUrl?: StringNullableFilter<"LightningTalk"> | string | null
    createdAt?: DateTimeFilter<"LightningTalk"> | Date | string
    updatedAt?: DateTimeFilter<"LightningTalk"> | Date | string
    exhibit?: XOR<ExhibitRelationFilter, ExhibitWhereInput>
  }

  export type LightningTalkOrderByWithRelationInput = {
    exhibitId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    slideUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    exhibit?: ExhibitOrderByWithRelationInput
  }

  export type LightningTalkWhereUniqueInput = Prisma.AtLeast<{
    exhibitId?: string
    AND?: LightningTalkWhereInput | LightningTalkWhereInput[]
    OR?: LightningTalkWhereInput[]
    NOT?: LightningTalkWhereInput | LightningTalkWhereInput[]
    startTime?: DateTimeFilter<"LightningTalk"> | Date | string
    duration?: IntFilter<"LightningTalk"> | number
    slideUrl?: StringNullableFilter<"LightningTalk"> | string | null
    createdAt?: DateTimeFilter<"LightningTalk"> | Date | string
    updatedAt?: DateTimeFilter<"LightningTalk"> | Date | string
    exhibit?: XOR<ExhibitRelationFilter, ExhibitWhereInput>
  }, "exhibitId">

  export type LightningTalkOrderByWithAggregationInput = {
    exhibitId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    slideUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LightningTalkCountOrderByAggregateInput
    _avg?: LightningTalkAvgOrderByAggregateInput
    _max?: LightningTalkMaxOrderByAggregateInput
    _min?: LightningTalkMinOrderByAggregateInput
    _sum?: LightningTalkSumOrderByAggregateInput
  }

  export type LightningTalkScalarWhereWithAggregatesInput = {
    AND?: LightningTalkScalarWhereWithAggregatesInput | LightningTalkScalarWhereWithAggregatesInput[]
    OR?: LightningTalkScalarWhereWithAggregatesInput[]
    NOT?: LightningTalkScalarWhereWithAggregatesInput | LightningTalkScalarWhereWithAggregatesInput[]
    exhibitId?: StringWithAggregatesFilter<"LightningTalk"> | string
    startTime?: DateTimeWithAggregatesFilter<"LightningTalk"> | Date | string
    duration?: IntWithAggregatesFilter<"LightningTalk"> | number
    slideUrl?: StringNullableWithAggregatesFilter<"LightningTalk"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LightningTalk"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LightningTalk"> | Date | string
  }

  export type MemberEventWhereInput = {
    AND?: MemberEventWhereInput | MemberEventWhereInput[]
    OR?: MemberEventWhereInput[]
    NOT?: MemberEventWhereInput | MemberEventWhereInput[]
    id?: StringFilter<"MemberEvent"> | string
    memberId?: StringFilter<"MemberEvent"> | string
    eventId?: StringFilter<"MemberEvent"> | string
    createdAt?: DateTimeFilter<"MemberEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MemberEvent"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type MemberEventOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type MemberEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberId_eventId?: MemberEventMemberIdEventIdCompoundUniqueInput
    AND?: MemberEventWhereInput | MemberEventWhereInput[]
    OR?: MemberEventWhereInput[]
    NOT?: MemberEventWhereInput | MemberEventWhereInput[]
    memberId?: StringFilter<"MemberEvent"> | string
    eventId?: StringFilter<"MemberEvent"> | string
    createdAt?: DateTimeFilter<"MemberEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MemberEvent"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
  }, "id" | "memberId_eventId">

  export type MemberEventOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberEventCountOrderByAggregateInput
    _max?: MemberEventMaxOrderByAggregateInput
    _min?: MemberEventMinOrderByAggregateInput
  }

  export type MemberEventScalarWhereWithAggregatesInput = {
    AND?: MemberEventScalarWhereWithAggregatesInput | MemberEventScalarWhereWithAggregatesInput[]
    OR?: MemberEventScalarWhereWithAggregatesInput[]
    NOT?: MemberEventScalarWhereWithAggregatesInput | MemberEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberEvent"> | string
    memberId?: StringWithAggregatesFilter<"MemberEvent"> | string
    eventId?: StringWithAggregatesFilter<"MemberEvent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MemberEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberEvent"> | Date | string
  }

  export type MemberExhibitWhereInput = {
    AND?: MemberExhibitWhereInput | MemberExhibitWhereInput[]
    OR?: MemberExhibitWhereInput[]
    NOT?: MemberExhibitWhereInput | MemberExhibitWhereInput[]
    id?: StringFilter<"MemberExhibit"> | string
    memberId?: StringFilter<"MemberExhibit"> | string
    exhibitId?: StringFilter<"MemberExhibit"> | string
    createdAt?: DateTimeFilter<"MemberExhibit"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExhibit"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    exhibit?: XOR<ExhibitRelationFilter, ExhibitWhereInput>
  }

  export type MemberExhibitOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    exhibitId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    exhibit?: ExhibitOrderByWithRelationInput
  }

  export type MemberExhibitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberId_exhibitId?: MemberExhibitMemberIdExhibitIdCompoundUniqueInput
    AND?: MemberExhibitWhereInput | MemberExhibitWhereInput[]
    OR?: MemberExhibitWhereInput[]
    NOT?: MemberExhibitWhereInput | MemberExhibitWhereInput[]
    memberId?: StringFilter<"MemberExhibit"> | string
    exhibitId?: StringFilter<"MemberExhibit"> | string
    createdAt?: DateTimeFilter<"MemberExhibit"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExhibit"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    exhibit?: XOR<ExhibitRelationFilter, ExhibitWhereInput>
  }, "id" | "memberId_exhibitId">

  export type MemberExhibitOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    exhibitId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberExhibitCountOrderByAggregateInput
    _max?: MemberExhibitMaxOrderByAggregateInput
    _min?: MemberExhibitMinOrderByAggregateInput
  }

  export type MemberExhibitScalarWhereWithAggregatesInput = {
    AND?: MemberExhibitScalarWhereWithAggregatesInput | MemberExhibitScalarWhereWithAggregatesInput[]
    OR?: MemberExhibitScalarWhereWithAggregatesInput[]
    NOT?: MemberExhibitScalarWhereWithAggregatesInput | MemberExhibitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberExhibit"> | string
    memberId?: StringWithAggregatesFilter<"MemberExhibit"> | string
    exhibitId?: StringWithAggregatesFilter<"MemberExhibit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MemberExhibit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberExhibit"> | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountCreateNestedManyWithoutMemberInput
    events?: MemberEventCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountUncheckedCreateNestedManyWithoutMemberInput
    events?: MemberEventUncheckedCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUpdateManyWithoutMemberNestedInput
    events?: MemberEventUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUncheckedUpdateManyWithoutMemberNestedInput
    events?: MemberEventUncheckedUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscordAccountCreateInput = {
    id: string
    nickName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutDiscordAccountsInput
  }

  export type DiscordAccountUncheckedCreateInput = {
    id: string
    nickName: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscordAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutDiscordAccountsNestedInput
  }

  export type DiscordAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscordAccountCreateManyInput = {
    id: string
    nickName: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscordAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscordAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberEventCreateNestedManyWithoutEventInput
    exhibits?: ExhibitCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberEventUncheckedCreateNestedManyWithoutEventInput
    exhibits?: ExhibitUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberEventUpdateManyWithoutEventNestedInput
    exhibits?: ExhibitUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberEventUncheckedUpdateManyWithoutEventNestedInput
    exhibits?: ExhibitUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExhibitCreateInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutExhibitsInput
    members?: MemberExhibitCreateNestedManyWithoutExhibitInput
    lightningTalk?: LightningTalkCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberExhibitUncheckedCreateNestedManyWithoutExhibitInput
    lightningTalk?: LightningTalkUncheckedCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutExhibitsNestedInput
    members?: MemberExhibitUpdateManyWithoutExhibitNestedInput
    lightningTalk?: LightningTalkUpdateOneWithoutExhibitNestedInput
  }

  export type ExhibitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberExhibitUncheckedUpdateManyWithoutExhibitNestedInput
    lightningTalk?: LightningTalkUncheckedUpdateOneWithoutExhibitNestedInput
  }

  export type ExhibitCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExhibitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExhibitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LightningTalkCreateInput = {
    startTime: Date | string
    duration: number
    slideUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exhibit: ExhibitCreateNestedOneWithoutLightningTalkInput
  }

  export type LightningTalkUncheckedCreateInput = {
    exhibitId: string
    startTime: Date | string
    duration: number
    slideUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LightningTalkUpdateInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exhibit?: ExhibitUpdateOneRequiredWithoutLightningTalkNestedInput
  }

  export type LightningTalkUncheckedUpdateInput = {
    exhibitId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LightningTalkCreateManyInput = {
    exhibitId: string
    startTime: Date | string
    duration: number
    slideUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LightningTalkUpdateManyMutationInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LightningTalkUncheckedUpdateManyInput = {
    exhibitId?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutEventsInput
    event: EventCreateNestedOneWithoutMembersInput
  }

  export type MemberEventUncheckedCreateInput = {
    id?: string
    memberId: string
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutEventsNestedInput
    event?: EventUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventCreateManyInput = {
    id?: string
    memberId: string
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutExhibitsInput
    exhibit: ExhibitCreateNestedOneWithoutMembersInput
  }

  export type MemberExhibitUncheckedCreateInput = {
    id?: string
    memberId: string
    exhibitId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutExhibitsNestedInput
    exhibit?: ExhibitUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberExhibitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    exhibitId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitCreateManyInput = {
    id?: string
    memberId: string
    exhibitId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    exhibitId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DiscordAccountListRelationFilter = {
    every?: DiscordAccountWhereInput
    some?: DiscordAccountWhereInput
    none?: DiscordAccountWhereInput
  }

  export type MemberEventListRelationFilter = {
    every?: MemberEventWhereInput
    some?: MemberEventWhereInput
    none?: MemberEventWhereInput
  }

  export type MemberExhibitListRelationFilter = {
    every?: MemberExhibitWhereInput
    some?: MemberExhibitWhereInput
    none?: MemberExhibitWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DiscordAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberExhibitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    email?: SortOrder
    personalEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    email?: SortOrder
    personalEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    email?: SortOrder
    personalEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type MemberRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type DiscordAccountCountOrderByAggregateInput = {
    id?: SortOrder
    nickName?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscordAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    nickName?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscordAccountMinOrderByAggregateInput = {
    id?: SortOrder
    nickName?: SortOrder
    memberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExhibitListRelationFilter = {
    every?: ExhibitWhereInput
    some?: ExhibitWhereInput
    none?: ExhibitWhereInput
  }

  export type ExhibitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type LightningTalkNullableRelationFilter = {
    is?: LightningTalkWhereInput | null
    isNot?: LightningTalkWhereInput | null
  }

  export type ExhibitCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    markdownContent?: SortOrder
    url?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExhibitMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    markdownContent?: SortOrder
    url?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExhibitMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    markdownContent?: SortOrder
    url?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ExhibitRelationFilter = {
    is?: ExhibitWhereInput
    isNot?: ExhibitWhereInput
  }

  export type LightningTalkCountOrderByAggregateInput = {
    exhibitId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    slideUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LightningTalkAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type LightningTalkMaxOrderByAggregateInput = {
    exhibitId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    slideUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LightningTalkMinOrderByAggregateInput = {
    exhibitId?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    slideUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LightningTalkSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MemberEventMemberIdEventIdCompoundUniqueInput = {
    memberId: string
    eventId: string
  }

  export type MemberEventCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberEventMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberEventMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    eventId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberExhibitMemberIdExhibitIdCompoundUniqueInput = {
    memberId: string
    exhibitId: string
  }

  export type MemberExhibitCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    exhibitId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberExhibitMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    exhibitId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberExhibitMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    exhibitId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscordAccountCreateNestedManyWithoutMemberInput = {
    create?: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput> | DiscordAccountCreateWithoutMemberInput[] | DiscordAccountUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: DiscordAccountCreateOrConnectWithoutMemberInput | DiscordAccountCreateOrConnectWithoutMemberInput[]
    createMany?: DiscordAccountCreateManyMemberInputEnvelope
    connect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
  }

  export type MemberEventCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput> | MemberEventCreateWithoutMemberInput[] | MemberEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutMemberInput | MemberEventCreateOrConnectWithoutMemberInput[]
    createMany?: MemberEventCreateManyMemberInputEnvelope
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
  }

  export type MemberExhibitCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput> | MemberExhibitCreateWithoutMemberInput[] | MemberExhibitUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutMemberInput | MemberExhibitCreateOrConnectWithoutMemberInput[]
    createMany?: MemberExhibitCreateManyMemberInputEnvelope
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
  }

  export type DiscordAccountUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput> | DiscordAccountCreateWithoutMemberInput[] | DiscordAccountUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: DiscordAccountCreateOrConnectWithoutMemberInput | DiscordAccountCreateOrConnectWithoutMemberInput[]
    createMany?: DiscordAccountCreateManyMemberInputEnvelope
    connect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
  }

  export type MemberEventUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput> | MemberEventCreateWithoutMemberInput[] | MemberEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutMemberInput | MemberEventCreateOrConnectWithoutMemberInput[]
    createMany?: MemberEventCreateManyMemberInputEnvelope
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
  }

  export type MemberExhibitUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput> | MemberExhibitCreateWithoutMemberInput[] | MemberExhibitUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutMemberInput | MemberExhibitCreateOrConnectWithoutMemberInput[]
    createMany?: MemberExhibitCreateManyMemberInputEnvelope
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DiscordAccountUpdateManyWithoutMemberNestedInput = {
    create?: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput> | DiscordAccountCreateWithoutMemberInput[] | DiscordAccountUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: DiscordAccountCreateOrConnectWithoutMemberInput | DiscordAccountCreateOrConnectWithoutMemberInput[]
    upsert?: DiscordAccountUpsertWithWhereUniqueWithoutMemberInput | DiscordAccountUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: DiscordAccountCreateManyMemberInputEnvelope
    set?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    disconnect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    delete?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    connect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    update?: DiscordAccountUpdateWithWhereUniqueWithoutMemberInput | DiscordAccountUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: DiscordAccountUpdateManyWithWhereWithoutMemberInput | DiscordAccountUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: DiscordAccountScalarWhereInput | DiscordAccountScalarWhereInput[]
  }

  export type MemberEventUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput> | MemberEventCreateWithoutMemberInput[] | MemberEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutMemberInput | MemberEventCreateOrConnectWithoutMemberInput[]
    upsert?: MemberEventUpsertWithWhereUniqueWithoutMemberInput | MemberEventUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberEventCreateManyMemberInputEnvelope
    set?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    disconnect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    delete?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    update?: MemberEventUpdateWithWhereUniqueWithoutMemberInput | MemberEventUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberEventUpdateManyWithWhereWithoutMemberInput | MemberEventUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
  }

  export type MemberExhibitUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput> | MemberExhibitCreateWithoutMemberInput[] | MemberExhibitUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutMemberInput | MemberExhibitCreateOrConnectWithoutMemberInput[]
    upsert?: MemberExhibitUpsertWithWhereUniqueWithoutMemberInput | MemberExhibitUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberExhibitCreateManyMemberInputEnvelope
    set?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    disconnect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    delete?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    update?: MemberExhibitUpdateWithWhereUniqueWithoutMemberInput | MemberExhibitUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberExhibitUpdateManyWithWhereWithoutMemberInput | MemberExhibitUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
  }

  export type DiscordAccountUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput> | DiscordAccountCreateWithoutMemberInput[] | DiscordAccountUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: DiscordAccountCreateOrConnectWithoutMemberInput | DiscordAccountCreateOrConnectWithoutMemberInput[]
    upsert?: DiscordAccountUpsertWithWhereUniqueWithoutMemberInput | DiscordAccountUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: DiscordAccountCreateManyMemberInputEnvelope
    set?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    disconnect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    delete?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    connect?: DiscordAccountWhereUniqueInput | DiscordAccountWhereUniqueInput[]
    update?: DiscordAccountUpdateWithWhereUniqueWithoutMemberInput | DiscordAccountUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: DiscordAccountUpdateManyWithWhereWithoutMemberInput | DiscordAccountUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: DiscordAccountScalarWhereInput | DiscordAccountScalarWhereInput[]
  }

  export type MemberEventUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput> | MemberEventCreateWithoutMemberInput[] | MemberEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutMemberInput | MemberEventCreateOrConnectWithoutMemberInput[]
    upsert?: MemberEventUpsertWithWhereUniqueWithoutMemberInput | MemberEventUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberEventCreateManyMemberInputEnvelope
    set?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    disconnect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    delete?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    update?: MemberEventUpdateWithWhereUniqueWithoutMemberInput | MemberEventUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberEventUpdateManyWithWhereWithoutMemberInput | MemberEventUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
  }

  export type MemberExhibitUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput> | MemberExhibitCreateWithoutMemberInput[] | MemberExhibitUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutMemberInput | MemberExhibitCreateOrConnectWithoutMemberInput[]
    upsert?: MemberExhibitUpsertWithWhereUniqueWithoutMemberInput | MemberExhibitUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MemberExhibitCreateManyMemberInputEnvelope
    set?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    disconnect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    delete?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    update?: MemberExhibitUpdateWithWhereUniqueWithoutMemberInput | MemberExhibitUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MemberExhibitUpdateManyWithWhereWithoutMemberInput | MemberExhibitUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
  }

  export type MemberCreateNestedOneWithoutDiscordAccountsInput = {
    create?: XOR<MemberCreateWithoutDiscordAccountsInput, MemberUncheckedCreateWithoutDiscordAccountsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutDiscordAccountsInput
    connect?: MemberWhereUniqueInput
  }

  export type MemberUpdateOneRequiredWithoutDiscordAccountsNestedInput = {
    create?: XOR<MemberCreateWithoutDiscordAccountsInput, MemberUncheckedCreateWithoutDiscordAccountsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutDiscordAccountsInput
    upsert?: MemberUpsertWithoutDiscordAccountsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutDiscordAccountsInput, MemberUpdateWithoutDiscordAccountsInput>, MemberUncheckedUpdateWithoutDiscordAccountsInput>
  }

  export type MemberEventCreateNestedManyWithoutEventInput = {
    create?: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput> | MemberEventCreateWithoutEventInput[] | MemberEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutEventInput | MemberEventCreateOrConnectWithoutEventInput[]
    createMany?: MemberEventCreateManyEventInputEnvelope
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
  }

  export type ExhibitCreateNestedManyWithoutEventInput = {
    create?: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput> | ExhibitCreateWithoutEventInput[] | ExhibitUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ExhibitCreateOrConnectWithoutEventInput | ExhibitCreateOrConnectWithoutEventInput[]
    createMany?: ExhibitCreateManyEventInputEnvelope
    connect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
  }

  export type MemberEventUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput> | MemberEventCreateWithoutEventInput[] | MemberEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutEventInput | MemberEventCreateOrConnectWithoutEventInput[]
    createMany?: MemberEventCreateManyEventInputEnvelope
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
  }

  export type ExhibitUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput> | ExhibitCreateWithoutEventInput[] | ExhibitUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ExhibitCreateOrConnectWithoutEventInput | ExhibitCreateOrConnectWithoutEventInput[]
    createMany?: ExhibitCreateManyEventInputEnvelope
    connect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
  }

  export type MemberEventUpdateManyWithoutEventNestedInput = {
    create?: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput> | MemberEventCreateWithoutEventInput[] | MemberEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutEventInput | MemberEventCreateOrConnectWithoutEventInput[]
    upsert?: MemberEventUpsertWithWhereUniqueWithoutEventInput | MemberEventUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: MemberEventCreateManyEventInputEnvelope
    set?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    disconnect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    delete?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    update?: MemberEventUpdateWithWhereUniqueWithoutEventInput | MemberEventUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: MemberEventUpdateManyWithWhereWithoutEventInput | MemberEventUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
  }

  export type ExhibitUpdateManyWithoutEventNestedInput = {
    create?: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput> | ExhibitCreateWithoutEventInput[] | ExhibitUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ExhibitCreateOrConnectWithoutEventInput | ExhibitCreateOrConnectWithoutEventInput[]
    upsert?: ExhibitUpsertWithWhereUniqueWithoutEventInput | ExhibitUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ExhibitCreateManyEventInputEnvelope
    set?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    disconnect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    delete?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    connect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    update?: ExhibitUpdateWithWhereUniqueWithoutEventInput | ExhibitUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ExhibitUpdateManyWithWhereWithoutEventInput | ExhibitUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ExhibitScalarWhereInput | ExhibitScalarWhereInput[]
  }

  export type MemberEventUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput> | MemberEventCreateWithoutEventInput[] | MemberEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: MemberEventCreateOrConnectWithoutEventInput | MemberEventCreateOrConnectWithoutEventInput[]
    upsert?: MemberEventUpsertWithWhereUniqueWithoutEventInput | MemberEventUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: MemberEventCreateManyEventInputEnvelope
    set?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    disconnect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    delete?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    connect?: MemberEventWhereUniqueInput | MemberEventWhereUniqueInput[]
    update?: MemberEventUpdateWithWhereUniqueWithoutEventInput | MemberEventUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: MemberEventUpdateManyWithWhereWithoutEventInput | MemberEventUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
  }

  export type ExhibitUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput> | ExhibitCreateWithoutEventInput[] | ExhibitUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ExhibitCreateOrConnectWithoutEventInput | ExhibitCreateOrConnectWithoutEventInput[]
    upsert?: ExhibitUpsertWithWhereUniqueWithoutEventInput | ExhibitUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ExhibitCreateManyEventInputEnvelope
    set?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    disconnect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    delete?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    connect?: ExhibitWhereUniqueInput | ExhibitWhereUniqueInput[]
    update?: ExhibitUpdateWithWhereUniqueWithoutEventInput | ExhibitUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ExhibitUpdateManyWithWhereWithoutEventInput | ExhibitUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ExhibitScalarWhereInput | ExhibitScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutExhibitsInput = {
    create?: XOR<EventCreateWithoutExhibitsInput, EventUncheckedCreateWithoutExhibitsInput>
    connectOrCreate?: EventCreateOrConnectWithoutExhibitsInput
    connect?: EventWhereUniqueInput
  }

  export type MemberExhibitCreateNestedManyWithoutExhibitInput = {
    create?: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput> | MemberExhibitCreateWithoutExhibitInput[] | MemberExhibitUncheckedCreateWithoutExhibitInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutExhibitInput | MemberExhibitCreateOrConnectWithoutExhibitInput[]
    createMany?: MemberExhibitCreateManyExhibitInputEnvelope
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
  }

  export type LightningTalkCreateNestedOneWithoutExhibitInput = {
    create?: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
    connectOrCreate?: LightningTalkCreateOrConnectWithoutExhibitInput
    connect?: LightningTalkWhereUniqueInput
  }

  export type MemberExhibitUncheckedCreateNestedManyWithoutExhibitInput = {
    create?: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput> | MemberExhibitCreateWithoutExhibitInput[] | MemberExhibitUncheckedCreateWithoutExhibitInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutExhibitInput | MemberExhibitCreateOrConnectWithoutExhibitInput[]
    createMany?: MemberExhibitCreateManyExhibitInputEnvelope
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
  }

  export type LightningTalkUncheckedCreateNestedOneWithoutExhibitInput = {
    create?: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
    connectOrCreate?: LightningTalkCreateOrConnectWithoutExhibitInput
    connect?: LightningTalkWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutExhibitsNestedInput = {
    create?: XOR<EventCreateWithoutExhibitsInput, EventUncheckedCreateWithoutExhibitsInput>
    connectOrCreate?: EventCreateOrConnectWithoutExhibitsInput
    upsert?: EventUpsertWithoutExhibitsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutExhibitsInput, EventUpdateWithoutExhibitsInput>, EventUncheckedUpdateWithoutExhibitsInput>
  }

  export type MemberExhibitUpdateManyWithoutExhibitNestedInput = {
    create?: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput> | MemberExhibitCreateWithoutExhibitInput[] | MemberExhibitUncheckedCreateWithoutExhibitInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutExhibitInput | MemberExhibitCreateOrConnectWithoutExhibitInput[]
    upsert?: MemberExhibitUpsertWithWhereUniqueWithoutExhibitInput | MemberExhibitUpsertWithWhereUniqueWithoutExhibitInput[]
    createMany?: MemberExhibitCreateManyExhibitInputEnvelope
    set?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    disconnect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    delete?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    update?: MemberExhibitUpdateWithWhereUniqueWithoutExhibitInput | MemberExhibitUpdateWithWhereUniqueWithoutExhibitInput[]
    updateMany?: MemberExhibitUpdateManyWithWhereWithoutExhibitInput | MemberExhibitUpdateManyWithWhereWithoutExhibitInput[]
    deleteMany?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
  }

  export type LightningTalkUpdateOneWithoutExhibitNestedInput = {
    create?: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
    connectOrCreate?: LightningTalkCreateOrConnectWithoutExhibitInput
    upsert?: LightningTalkUpsertWithoutExhibitInput
    disconnect?: LightningTalkWhereInput | boolean
    delete?: LightningTalkWhereInput | boolean
    connect?: LightningTalkWhereUniqueInput
    update?: XOR<XOR<LightningTalkUpdateToOneWithWhereWithoutExhibitInput, LightningTalkUpdateWithoutExhibitInput>, LightningTalkUncheckedUpdateWithoutExhibitInput>
  }

  export type MemberExhibitUncheckedUpdateManyWithoutExhibitNestedInput = {
    create?: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput> | MemberExhibitCreateWithoutExhibitInput[] | MemberExhibitUncheckedCreateWithoutExhibitInput[]
    connectOrCreate?: MemberExhibitCreateOrConnectWithoutExhibitInput | MemberExhibitCreateOrConnectWithoutExhibitInput[]
    upsert?: MemberExhibitUpsertWithWhereUniqueWithoutExhibitInput | MemberExhibitUpsertWithWhereUniqueWithoutExhibitInput[]
    createMany?: MemberExhibitCreateManyExhibitInputEnvelope
    set?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    disconnect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    delete?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    connect?: MemberExhibitWhereUniqueInput | MemberExhibitWhereUniqueInput[]
    update?: MemberExhibitUpdateWithWhereUniqueWithoutExhibitInput | MemberExhibitUpdateWithWhereUniqueWithoutExhibitInput[]
    updateMany?: MemberExhibitUpdateManyWithWhereWithoutExhibitInput | MemberExhibitUpdateManyWithWhereWithoutExhibitInput[]
    deleteMany?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
  }

  export type LightningTalkUncheckedUpdateOneWithoutExhibitNestedInput = {
    create?: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
    connectOrCreate?: LightningTalkCreateOrConnectWithoutExhibitInput
    upsert?: LightningTalkUpsertWithoutExhibitInput
    disconnect?: LightningTalkWhereInput | boolean
    delete?: LightningTalkWhereInput | boolean
    connect?: LightningTalkWhereUniqueInput
    update?: XOR<XOR<LightningTalkUpdateToOneWithWhereWithoutExhibitInput, LightningTalkUpdateWithoutExhibitInput>, LightningTalkUncheckedUpdateWithoutExhibitInput>
  }

  export type ExhibitCreateNestedOneWithoutLightningTalkInput = {
    create?: XOR<ExhibitCreateWithoutLightningTalkInput, ExhibitUncheckedCreateWithoutLightningTalkInput>
    connectOrCreate?: ExhibitCreateOrConnectWithoutLightningTalkInput
    connect?: ExhibitWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExhibitUpdateOneRequiredWithoutLightningTalkNestedInput = {
    create?: XOR<ExhibitCreateWithoutLightningTalkInput, ExhibitUncheckedCreateWithoutLightningTalkInput>
    connectOrCreate?: ExhibitCreateOrConnectWithoutLightningTalkInput
    upsert?: ExhibitUpsertWithoutLightningTalkInput
    connect?: ExhibitWhereUniqueInput
    update?: XOR<XOR<ExhibitUpdateToOneWithWhereWithoutLightningTalkInput, ExhibitUpdateWithoutLightningTalkInput>, ExhibitUncheckedUpdateWithoutLightningTalkInput>
  }

  export type MemberCreateNestedOneWithoutEventsInput = {
    create?: XOR<MemberCreateWithoutEventsInput, MemberUncheckedCreateWithoutEventsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutEventsInput
    connect?: MemberWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutMembersInput = {
    create?: XOR<EventCreateWithoutMembersInput, EventUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EventCreateOrConnectWithoutMembersInput
    connect?: EventWhereUniqueInput
  }

  export type MemberUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<MemberCreateWithoutEventsInput, MemberUncheckedCreateWithoutEventsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutEventsInput
    upsert?: MemberUpsertWithoutEventsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutEventsInput, MemberUpdateWithoutEventsInput>, MemberUncheckedUpdateWithoutEventsInput>
  }

  export type EventUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<EventCreateWithoutMembersInput, EventUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EventCreateOrConnectWithoutMembersInput
    upsert?: EventUpsertWithoutMembersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutMembersInput, EventUpdateWithoutMembersInput>, EventUncheckedUpdateWithoutMembersInput>
  }

  export type MemberCreateNestedOneWithoutExhibitsInput = {
    create?: XOR<MemberCreateWithoutExhibitsInput, MemberUncheckedCreateWithoutExhibitsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutExhibitsInput
    connect?: MemberWhereUniqueInput
  }

  export type ExhibitCreateNestedOneWithoutMembersInput = {
    create?: XOR<ExhibitCreateWithoutMembersInput, ExhibitUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ExhibitCreateOrConnectWithoutMembersInput
    connect?: ExhibitWhereUniqueInput
  }

  export type MemberUpdateOneRequiredWithoutExhibitsNestedInput = {
    create?: XOR<MemberCreateWithoutExhibitsInput, MemberUncheckedCreateWithoutExhibitsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutExhibitsInput
    upsert?: MemberUpsertWithoutExhibitsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutExhibitsInput, MemberUpdateWithoutExhibitsInput>, MemberUncheckedUpdateWithoutExhibitsInput>
  }

  export type ExhibitUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ExhibitCreateWithoutMembersInput, ExhibitUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ExhibitCreateOrConnectWithoutMembersInput
    upsert?: ExhibitUpsertWithoutMembersInput
    connect?: ExhibitWhereUniqueInput
    update?: XOR<XOR<ExhibitUpdateToOneWithWhereWithoutMembersInput, ExhibitUpdateWithoutMembersInput>, ExhibitUncheckedUpdateWithoutMembersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DiscordAccountCreateWithoutMemberInput = {
    id: string
    nickName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscordAccountUncheckedCreateWithoutMemberInput = {
    id: string
    nickName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscordAccountCreateOrConnectWithoutMemberInput = {
    where: DiscordAccountWhereUniqueInput
    create: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput>
  }

  export type DiscordAccountCreateManyMemberInputEnvelope = {
    data: DiscordAccountCreateManyMemberInput | DiscordAccountCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type MemberEventCreateWithoutMemberInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutMembersInput
  }

  export type MemberEventUncheckedCreateWithoutMemberInput = {
    id?: string
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventCreateOrConnectWithoutMemberInput = {
    where: MemberEventWhereUniqueInput
    create: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput>
  }

  export type MemberEventCreateManyMemberInputEnvelope = {
    data: MemberEventCreateManyMemberInput | MemberEventCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type MemberExhibitCreateWithoutMemberInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    exhibit: ExhibitCreateNestedOneWithoutMembersInput
  }

  export type MemberExhibitUncheckedCreateWithoutMemberInput = {
    id?: string
    exhibitId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitCreateOrConnectWithoutMemberInput = {
    where: MemberExhibitWhereUniqueInput
    create: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput>
  }

  export type MemberExhibitCreateManyMemberInputEnvelope = {
    data: MemberExhibitCreateManyMemberInput | MemberExhibitCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type DiscordAccountUpsertWithWhereUniqueWithoutMemberInput = {
    where: DiscordAccountWhereUniqueInput
    update: XOR<DiscordAccountUpdateWithoutMemberInput, DiscordAccountUncheckedUpdateWithoutMemberInput>
    create: XOR<DiscordAccountCreateWithoutMemberInput, DiscordAccountUncheckedCreateWithoutMemberInput>
  }

  export type DiscordAccountUpdateWithWhereUniqueWithoutMemberInput = {
    where: DiscordAccountWhereUniqueInput
    data: XOR<DiscordAccountUpdateWithoutMemberInput, DiscordAccountUncheckedUpdateWithoutMemberInput>
  }

  export type DiscordAccountUpdateManyWithWhereWithoutMemberInput = {
    where: DiscordAccountScalarWhereInput
    data: XOR<DiscordAccountUpdateManyMutationInput, DiscordAccountUncheckedUpdateManyWithoutMemberInput>
  }

  export type DiscordAccountScalarWhereInput = {
    AND?: DiscordAccountScalarWhereInput | DiscordAccountScalarWhereInput[]
    OR?: DiscordAccountScalarWhereInput[]
    NOT?: DiscordAccountScalarWhereInput | DiscordAccountScalarWhereInput[]
    id?: StringFilter<"DiscordAccount"> | string
    nickName?: StringFilter<"DiscordAccount"> | string
    memberId?: StringFilter<"DiscordAccount"> | string
    createdAt?: DateTimeFilter<"DiscordAccount"> | Date | string
    updatedAt?: DateTimeFilter<"DiscordAccount"> | Date | string
  }

  export type MemberEventUpsertWithWhereUniqueWithoutMemberInput = {
    where: MemberEventWhereUniqueInput
    update: XOR<MemberEventUpdateWithoutMemberInput, MemberEventUncheckedUpdateWithoutMemberInput>
    create: XOR<MemberEventCreateWithoutMemberInput, MemberEventUncheckedCreateWithoutMemberInput>
  }

  export type MemberEventUpdateWithWhereUniqueWithoutMemberInput = {
    where: MemberEventWhereUniqueInput
    data: XOR<MemberEventUpdateWithoutMemberInput, MemberEventUncheckedUpdateWithoutMemberInput>
  }

  export type MemberEventUpdateManyWithWhereWithoutMemberInput = {
    where: MemberEventScalarWhereInput
    data: XOR<MemberEventUpdateManyMutationInput, MemberEventUncheckedUpdateManyWithoutMemberInput>
  }

  export type MemberEventScalarWhereInput = {
    AND?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
    OR?: MemberEventScalarWhereInput[]
    NOT?: MemberEventScalarWhereInput | MemberEventScalarWhereInput[]
    id?: StringFilter<"MemberEvent"> | string
    memberId?: StringFilter<"MemberEvent"> | string
    eventId?: StringFilter<"MemberEvent"> | string
    createdAt?: DateTimeFilter<"MemberEvent"> | Date | string
    updatedAt?: DateTimeFilter<"MemberEvent"> | Date | string
  }

  export type MemberExhibitUpsertWithWhereUniqueWithoutMemberInput = {
    where: MemberExhibitWhereUniqueInput
    update: XOR<MemberExhibitUpdateWithoutMemberInput, MemberExhibitUncheckedUpdateWithoutMemberInput>
    create: XOR<MemberExhibitCreateWithoutMemberInput, MemberExhibitUncheckedCreateWithoutMemberInput>
  }

  export type MemberExhibitUpdateWithWhereUniqueWithoutMemberInput = {
    where: MemberExhibitWhereUniqueInput
    data: XOR<MemberExhibitUpdateWithoutMemberInput, MemberExhibitUncheckedUpdateWithoutMemberInput>
  }

  export type MemberExhibitUpdateManyWithWhereWithoutMemberInput = {
    where: MemberExhibitScalarWhereInput
    data: XOR<MemberExhibitUpdateManyMutationInput, MemberExhibitUncheckedUpdateManyWithoutMemberInput>
  }

  export type MemberExhibitScalarWhereInput = {
    AND?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
    OR?: MemberExhibitScalarWhereInput[]
    NOT?: MemberExhibitScalarWhereInput | MemberExhibitScalarWhereInput[]
    id?: StringFilter<"MemberExhibit"> | string
    memberId?: StringFilter<"MemberExhibit"> | string
    exhibitId?: StringFilter<"MemberExhibit"> | string
    createdAt?: DateTimeFilter<"MemberExhibit"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExhibit"> | Date | string
  }

  export type MemberCreateWithoutDiscordAccountsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: MemberEventCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutDiscordAccountsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: MemberEventUncheckedCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutDiscordAccountsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutDiscordAccountsInput, MemberUncheckedCreateWithoutDiscordAccountsInput>
  }

  export type MemberUpsertWithoutDiscordAccountsInput = {
    update: XOR<MemberUpdateWithoutDiscordAccountsInput, MemberUncheckedUpdateWithoutDiscordAccountsInput>
    create: XOR<MemberCreateWithoutDiscordAccountsInput, MemberUncheckedCreateWithoutDiscordAccountsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutDiscordAccountsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutDiscordAccountsInput, MemberUncheckedUpdateWithoutDiscordAccountsInput>
  }

  export type MemberUpdateWithoutDiscordAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: MemberEventUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutDiscordAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: MemberEventUncheckedUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberEventCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutEventsInput
  }

  export type MemberEventUncheckedCreateWithoutEventInput = {
    id?: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventCreateOrConnectWithoutEventInput = {
    where: MemberEventWhereUniqueInput
    create: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput>
  }

  export type MemberEventCreateManyEventInputEnvelope = {
    data: MemberEventCreateManyEventInput | MemberEventCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type ExhibitCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberExhibitCreateNestedManyWithoutExhibitInput
    lightningTalk?: LightningTalkCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberExhibitUncheckedCreateNestedManyWithoutExhibitInput
    lightningTalk?: LightningTalkUncheckedCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitCreateOrConnectWithoutEventInput = {
    where: ExhibitWhereUniqueInput
    create: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput>
  }

  export type ExhibitCreateManyEventInputEnvelope = {
    data: ExhibitCreateManyEventInput | ExhibitCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type MemberEventUpsertWithWhereUniqueWithoutEventInput = {
    where: MemberEventWhereUniqueInput
    update: XOR<MemberEventUpdateWithoutEventInput, MemberEventUncheckedUpdateWithoutEventInput>
    create: XOR<MemberEventCreateWithoutEventInput, MemberEventUncheckedCreateWithoutEventInput>
  }

  export type MemberEventUpdateWithWhereUniqueWithoutEventInput = {
    where: MemberEventWhereUniqueInput
    data: XOR<MemberEventUpdateWithoutEventInput, MemberEventUncheckedUpdateWithoutEventInput>
  }

  export type MemberEventUpdateManyWithWhereWithoutEventInput = {
    where: MemberEventScalarWhereInput
    data: XOR<MemberEventUpdateManyMutationInput, MemberEventUncheckedUpdateManyWithoutEventInput>
  }

  export type ExhibitUpsertWithWhereUniqueWithoutEventInput = {
    where: ExhibitWhereUniqueInput
    update: XOR<ExhibitUpdateWithoutEventInput, ExhibitUncheckedUpdateWithoutEventInput>
    create: XOR<ExhibitCreateWithoutEventInput, ExhibitUncheckedCreateWithoutEventInput>
  }

  export type ExhibitUpdateWithWhereUniqueWithoutEventInput = {
    where: ExhibitWhereUniqueInput
    data: XOR<ExhibitUpdateWithoutEventInput, ExhibitUncheckedUpdateWithoutEventInput>
  }

  export type ExhibitUpdateManyWithWhereWithoutEventInput = {
    where: ExhibitScalarWhereInput
    data: XOR<ExhibitUpdateManyMutationInput, ExhibitUncheckedUpdateManyWithoutEventInput>
  }

  export type ExhibitScalarWhereInput = {
    AND?: ExhibitScalarWhereInput | ExhibitScalarWhereInput[]
    OR?: ExhibitScalarWhereInput[]
    NOT?: ExhibitScalarWhereInput | ExhibitScalarWhereInput[]
    id?: StringFilter<"Exhibit"> | string
    name?: StringFilter<"Exhibit"> | string
    description?: StringNullableFilter<"Exhibit"> | string | null
    markdownContent?: StringNullableFilter<"Exhibit"> | string | null
    url?: StringNullableFilter<"Exhibit"> | string | null
    eventId?: StringFilter<"Exhibit"> | string
    createdAt?: DateTimeFilter<"Exhibit"> | Date | string
    updatedAt?: DateTimeFilter<"Exhibit"> | Date | string
  }

  export type EventCreateWithoutExhibitsInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberEventCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutExhibitsInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberEventUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutExhibitsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutExhibitsInput, EventUncheckedCreateWithoutExhibitsInput>
  }

  export type MemberExhibitCreateWithoutExhibitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutExhibitsInput
  }

  export type MemberExhibitUncheckedCreateWithoutExhibitInput = {
    id?: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitCreateOrConnectWithoutExhibitInput = {
    where: MemberExhibitWhereUniqueInput
    create: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput>
  }

  export type MemberExhibitCreateManyExhibitInputEnvelope = {
    data: MemberExhibitCreateManyExhibitInput | MemberExhibitCreateManyExhibitInput[]
    skipDuplicates?: boolean
  }

  export type LightningTalkCreateWithoutExhibitInput = {
    startTime: Date | string
    duration: number
    slideUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LightningTalkUncheckedCreateWithoutExhibitInput = {
    startTime: Date | string
    duration: number
    slideUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LightningTalkCreateOrConnectWithoutExhibitInput = {
    where: LightningTalkWhereUniqueInput
    create: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
  }

  export type EventUpsertWithoutExhibitsInput = {
    update: XOR<EventUpdateWithoutExhibitsInput, EventUncheckedUpdateWithoutExhibitsInput>
    create: XOR<EventCreateWithoutExhibitsInput, EventUncheckedCreateWithoutExhibitsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutExhibitsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutExhibitsInput, EventUncheckedUpdateWithoutExhibitsInput>
  }

  export type EventUpdateWithoutExhibitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberEventUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutExhibitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberEventUncheckedUpdateManyWithoutEventNestedInput
  }

  export type MemberExhibitUpsertWithWhereUniqueWithoutExhibitInput = {
    where: MemberExhibitWhereUniqueInput
    update: XOR<MemberExhibitUpdateWithoutExhibitInput, MemberExhibitUncheckedUpdateWithoutExhibitInput>
    create: XOR<MemberExhibitCreateWithoutExhibitInput, MemberExhibitUncheckedCreateWithoutExhibitInput>
  }

  export type MemberExhibitUpdateWithWhereUniqueWithoutExhibitInput = {
    where: MemberExhibitWhereUniqueInput
    data: XOR<MemberExhibitUpdateWithoutExhibitInput, MemberExhibitUncheckedUpdateWithoutExhibitInput>
  }

  export type MemberExhibitUpdateManyWithWhereWithoutExhibitInput = {
    where: MemberExhibitScalarWhereInput
    data: XOR<MemberExhibitUpdateManyMutationInput, MemberExhibitUncheckedUpdateManyWithoutExhibitInput>
  }

  export type LightningTalkUpsertWithoutExhibitInput = {
    update: XOR<LightningTalkUpdateWithoutExhibitInput, LightningTalkUncheckedUpdateWithoutExhibitInput>
    create: XOR<LightningTalkCreateWithoutExhibitInput, LightningTalkUncheckedCreateWithoutExhibitInput>
    where?: LightningTalkWhereInput
  }

  export type LightningTalkUpdateToOneWithWhereWithoutExhibitInput = {
    where?: LightningTalkWhereInput
    data: XOR<LightningTalkUpdateWithoutExhibitInput, LightningTalkUncheckedUpdateWithoutExhibitInput>
  }

  export type LightningTalkUpdateWithoutExhibitInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LightningTalkUncheckedUpdateWithoutExhibitInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    slideUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExhibitCreateWithoutLightningTalkInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutExhibitsInput
    members?: MemberExhibitCreateNestedManyWithoutExhibitInput
  }

  export type ExhibitUncheckedCreateWithoutLightningTalkInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberExhibitUncheckedCreateNestedManyWithoutExhibitInput
  }

  export type ExhibitCreateOrConnectWithoutLightningTalkInput = {
    where: ExhibitWhereUniqueInput
    create: XOR<ExhibitCreateWithoutLightningTalkInput, ExhibitUncheckedCreateWithoutLightningTalkInput>
  }

  export type ExhibitUpsertWithoutLightningTalkInput = {
    update: XOR<ExhibitUpdateWithoutLightningTalkInput, ExhibitUncheckedUpdateWithoutLightningTalkInput>
    create: XOR<ExhibitCreateWithoutLightningTalkInput, ExhibitUncheckedCreateWithoutLightningTalkInput>
    where?: ExhibitWhereInput
  }

  export type ExhibitUpdateToOneWithWhereWithoutLightningTalkInput = {
    where?: ExhibitWhereInput
    data: XOR<ExhibitUpdateWithoutLightningTalkInput, ExhibitUncheckedUpdateWithoutLightningTalkInput>
  }

  export type ExhibitUpdateWithoutLightningTalkInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutExhibitsNestedInput
    members?: MemberExhibitUpdateManyWithoutExhibitNestedInput
  }

  export type ExhibitUncheckedUpdateWithoutLightningTalkInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberExhibitUncheckedUpdateManyWithoutExhibitNestedInput
  }

  export type MemberCreateWithoutEventsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountUncheckedCreateNestedManyWithoutMemberInput
    exhibits?: MemberExhibitUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutEventsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutEventsInput, MemberUncheckedCreateWithoutEventsInput>
  }

  export type EventCreateWithoutMembersInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    exhibits?: ExhibitCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    exhibits?: ExhibitUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutMembersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutMembersInput, EventUncheckedCreateWithoutMembersInput>
  }

  export type MemberUpsertWithoutEventsInput = {
    update: XOR<MemberUpdateWithoutEventsInput, MemberUncheckedUpdateWithoutEventsInput>
    create: XOR<MemberCreateWithoutEventsInput, MemberUncheckedCreateWithoutEventsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutEventsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutEventsInput, MemberUncheckedUpdateWithoutEventsInput>
  }

  export type MemberUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUncheckedUpdateManyWithoutMemberNestedInput
    exhibits?: MemberExhibitUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type EventUpsertWithoutMembersInput = {
    update: XOR<EventUpdateWithoutMembersInput, EventUncheckedUpdateWithoutMembersInput>
    create: XOR<EventCreateWithoutMembersInput, EventUncheckedCreateWithoutMembersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutMembersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutMembersInput, EventUncheckedUpdateWithoutMembersInput>
  }

  export type EventUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exhibits?: ExhibitUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exhibits?: ExhibitUncheckedUpdateManyWithoutEventNestedInput
  }

  export type MemberCreateWithoutExhibitsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountCreateNestedManyWithoutMemberInput
    events?: MemberEventCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutExhibitsInput = {
    id?: string
    name: string
    studentId: string
    department: string
    email: string
    personalEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    discordAccounts?: DiscordAccountUncheckedCreateNestedManyWithoutMemberInput
    events?: MemberEventUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutExhibitsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutExhibitsInput, MemberUncheckedCreateWithoutExhibitsInput>
  }

  export type ExhibitCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutExhibitsInput
    lightningTalk?: LightningTalkCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lightningTalk?: LightningTalkUncheckedCreateNestedOneWithoutExhibitInput
  }

  export type ExhibitCreateOrConnectWithoutMembersInput = {
    where: ExhibitWhereUniqueInput
    create: XOR<ExhibitCreateWithoutMembersInput, ExhibitUncheckedCreateWithoutMembersInput>
  }

  export type MemberUpsertWithoutExhibitsInput = {
    update: XOR<MemberUpdateWithoutExhibitsInput, MemberUncheckedUpdateWithoutExhibitsInput>
    create: XOR<MemberCreateWithoutExhibitsInput, MemberUncheckedCreateWithoutExhibitsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutExhibitsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutExhibitsInput, MemberUncheckedUpdateWithoutExhibitsInput>
  }

  export type MemberUpdateWithoutExhibitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUpdateManyWithoutMemberNestedInput
    events?: MemberEventUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutExhibitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    personalEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discordAccounts?: DiscordAccountUncheckedUpdateManyWithoutMemberNestedInput
    events?: MemberEventUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type ExhibitUpsertWithoutMembersInput = {
    update: XOR<ExhibitUpdateWithoutMembersInput, ExhibitUncheckedUpdateWithoutMembersInput>
    create: XOR<ExhibitCreateWithoutMembersInput, ExhibitUncheckedCreateWithoutMembersInput>
    where?: ExhibitWhereInput
  }

  export type ExhibitUpdateToOneWithWhereWithoutMembersInput = {
    where?: ExhibitWhereInput
    data: XOR<ExhibitUpdateWithoutMembersInput, ExhibitUncheckedUpdateWithoutMembersInput>
  }

  export type ExhibitUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutExhibitsNestedInput
    lightningTalk?: LightningTalkUpdateOneWithoutExhibitNestedInput
  }

  export type ExhibitUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lightningTalk?: LightningTalkUncheckedUpdateOneWithoutExhibitNestedInput
  }

  export type DiscordAccountCreateManyMemberInput = {
    id: string
    nickName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventCreateManyMemberInput = {
    id?: string
    eventId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitCreateManyMemberInput = {
    id?: string
    exhibitId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiscordAccountUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscordAccountUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscordAccountUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    nickName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberEventUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exhibit?: ExhibitUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberExhibitUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    exhibitId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    exhibitId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventCreateManyEventInput = {
    id?: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExhibitCreateManyEventInput = {
    id?: string
    name: string
    description?: string | null
    markdownContent?: string | null
    url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberEventUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutEventsNestedInput
  }

  export type MemberEventUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberEventUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExhibitUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberExhibitUpdateManyWithoutExhibitNestedInput
    lightningTalk?: LightningTalkUpdateOneWithoutExhibitNestedInput
  }

  export type ExhibitUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberExhibitUncheckedUpdateManyWithoutExhibitNestedInput
    lightningTalk?: LightningTalkUncheckedUpdateOneWithoutExhibitNestedInput
  }

  export type ExhibitUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdownContent?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitCreateManyExhibitInput = {
    id?: string
    memberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExhibitUpdateWithoutExhibitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutExhibitsNestedInput
  }

  export type MemberExhibitUncheckedUpdateWithoutExhibitInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExhibitUncheckedUpdateManyWithoutExhibitInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MemberCountOutputTypeDefaultArgs instead
     */
    export type MemberCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventCountOutputTypeDefaultArgs instead
     */
    export type EventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExhibitCountOutputTypeDefaultArgs instead
     */
    export type ExhibitCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExhibitCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberDefaultArgs instead
     */
    export type MemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DiscordAccountDefaultArgs instead
     */
    export type DiscordAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DiscordAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventDefaultArgs instead
     */
    export type EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExhibitDefaultArgs instead
     */
    export type ExhibitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExhibitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LightningTalkDefaultArgs instead
     */
    export type LightningTalkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LightningTalkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberEventDefaultArgs instead
     */
    export type MemberEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberExhibitDefaultArgs instead
     */
    export type MemberExhibitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberExhibitDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}