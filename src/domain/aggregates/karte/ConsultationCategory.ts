/**
 * 相談カテゴリ — PC相談室で扱うトラブルの分類タグ
 *
 * IDと表示名のペアで構成され、追加はできるが削除はできない（履歴整合性のため）。
 */
export type ConsultationCategory = {
	/** カテゴリID */
	readonly id: ConsultationCategoryId;
	/** 表示名 */
	readonly displayName: string;
};

/** 定義済みカテゴリID */
export type ConsultationCategoryId =
	| "hardware_pc"
	| "problem_os"
	| "programming"
	| "usage_fs"
	| "usage_gakujo"
	| "usage_ms_software"
	| "usage_printer"
	| "usage_vm"
	| "usage_vpn"
	| "wifi_eduroam"
	| "wifi_smartphone"
	| "wifi_succes"
	| "other";

/** 定義済みカテゴリ一覧 */
export const CONSULTATION_CATEGORIES: readonly ConsultationCategory[] = [
	{ id: "hardware_pc", displayName: "PCのハードウェアに関する問題の相談" },
	{ id: "problem_os", displayName: "OSに関する問題" },
	{ id: "programming", displayName: "プログラミングに関する相談" },
	{ id: "usage_fs", displayName: "FSの使い方に関する相談" },
	{ id: "usage_gakujo", displayName: "学情の使い方に関する相談" },
	{
		id: "usage_ms_software",
		displayName: "Microsoftのソフトウェアに関する相談",
	},
	{ id: "usage_printer", displayName: "プリンタの使い方に関する相談" },
	{ id: "usage_vm", displayName: "Virtual Machineに関する相談" },
	{ id: "usage_vpn", displayName: "VPNの使い方に関する相談" },
	{ id: "wifi_eduroam", displayName: "eduroamに対する接続方法の相談" },
	{
		id: "wifi_smartphone",
		displayName: "スマホからのWiFi接続方法に関する相談",
	},
	{ id: "wifi_succes", displayName: "SUCCESに対する接続方法の相談" },
	{ id: "other", displayName: "その他の相談" },
] as const;
