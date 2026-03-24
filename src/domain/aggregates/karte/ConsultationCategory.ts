/**
 * 相談カテゴリ — PC相談室で扱うトラブルの分類タグ
 *
 * IDと表示名のペアで構成され、追加はできるが削除はできない（履歴整合性のため）。
 */

/** 定義済みカテゴリ一覧（単一の情報源） */
export const CONSULTATION_CATEGORIES = [
	{ id: "wifi_eduroam", displayName: "eduroamに対する接続方法の相談" },
	{ id: "wifi_success", displayName: "SUCCESSに対する接続方法の相談" },
	{
		id: "wifi_smartphone",
		displayName: "スマホからのWiFi接続方法に関する相談",
	},
	{ id: "usage_mac", displayName: "MacOSの使い方に関する相談" },
	{ id: "usage_fs", displayName: "FSの使い方に関する相談" },
	{ id: "usage_vpn", displayName: "VPNの使い方に関する相談" },
	{ id: "usage_mail", displayName: "メールの使い方に関する相談" },
	{ id: "usage_gakujo", displayName: "学情の使い方に関する相談" },
	{ id: "usage_onedrive", displayName: "OneDriveの使い方に関する相談" },
	{ id: "usage_printer", displayName: "プリンタの使い方に関する相談" },
	{ id: "usage_vm", displayName: "Virtual Machineに関する相談" },
	{
		id: "usage_ms_software",
		displayName: "Microsoftのソフトウェアに関する相談",
	},
	{ id: "hardware_pc", displayName: "PCのハードウェアに関する問題の相談" },
	{ id: "problem_credential", displayName: "資格情報に関する相談" },
	{ id: "problem_windows", displayName: "Windowsに関する問題" },
	{ id: "problem_linux", displayName: "Linuxに関する問題" },
	{ id: "programming", displayName: "プログラミングに関する相談" },
	{ id: "rent", displayName: "貸し出しに関する相談" },
	{ id: "other", displayName: "その他の相談" },
] as const;

/** 定義済みカテゴリID — CONSULTATION_CATEGORIESから導出 */
export type ConsultationCategoryId =
	(typeof CONSULTATION_CATEGORIES)[number]["id"];

/** カテゴリ型 */
export type ConsultationCategory = {
	readonly id: ConsultationCategoryId;
	readonly displayName: string;
};
