import {
  type DiscordAccount,
  type Event,
  type Exhibit,
  type LightningTalk,
  type Member,
  type MemberEvent,
  type MemberExhibit,
  type Prisma,
  PrismaClient,
} from "@prisma/client";

import { createRepositories } from "./repositories";
import { createServices } from "./services";

// 基本機能のエクスポート
export * from "./repositories";
export * from "./services";

// Prismaドメインモデルのエクスポート
export type {
  Member,
  Event,
  Exhibit,
  DiscordAccount,
  MemberEvent,
  MemberExhibit,
  LightningTalk,
};

// クライアント関連の型定義
type ClientOptions = {
  prismaOptions?: Prisma.PrismaClientOptions;
};

// サービスインターフェースのエクスポート
export type {
  IMemberService,
  IEventService,
  IExhibitService,
  IDiscordAccountService,
  ILightningTalkService,
} from "./services/interfaces";

// DTOのエクスポート
export type {
  MemberCreateDTO,
  MemberUpdateDTO,
  EventCreateDTO,
  EventUpdateDTO,
  ExhibitCreateDTO,
  ExhibitUpdateDTO,
  DiscordAccountCreateDTO,
  DiscordAccountUpdateDTO,
  LightningTalkCreateDTO,
  LightningTalkUpdateDTO,
} from "./services/interfaces";

// クライアント作成関数
export const createClient = ({ prismaOptions }: ClientOptions = {}) => {
  try {
    const prisma = new PrismaClient(prismaOptions);
    const repositories = createRepositories(prisma);
    const services = createServices(repositories);

    return {
      prisma,
      repositories,
      services,
      disconnect: async () => {
        await prisma.$disconnect();
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create client: ${error.message}`);
    }
    throw new Error("Failed to create client: Unknown error");
  }
};

// クライアントの型定義
export type Client = ReturnType<typeof createClient>;
