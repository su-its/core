/**
 * 部分的な所属情報の型定義
 *
 * 過去データのインポート時など、所属情報が不完全な場合に使用する。
 * 階層構造のリテラル型制約を維持しつつ、下位フィールドの欠損を許容する。
 * 最小単位は学部/研究科名のみ。それ未満は notRecorded() で表現する。
 */

import type {
	AgricultureFacultyValue,
	CreativeSciTechDoctoralValue,
	EducationDoctoralValue,
	EducationFacultyValue,
	EngineeringFacultyValue,
	GlobalCoCreationFacultyValue,
	HumanitiesFacultyValue,
	HumanitiesMasterValue,
	InformaticsFacultyValue,
	IntegratedSciTechMasterValue,
	MountainWatershedValue,
	OptoBiomedicalDoctoralValue,
	ProfessionalAffiliationValue,
	RegionalDevelopmentValue,
	ScienceFacultyValue,
} from "./universityStructure";

// ── 学部（Undergraduate）部分型 ──

export type PartialHumanitiesFacultyValue =
	| HumanitiesFacultyValue
	| {
			faculty: "人文社会科学部";
			enrollmentType: "昼間コース";
			department: "社会学科" | "言語文化学科" | "法学科" | "経済学科";
	  }
	| {
			faculty: "人文社会科学部";
			enrollmentType: "夜間主コース";
			department: "法学科" | "経済学科";
	  }
	| { faculty: "人文社会科学部"; enrollmentType: "昼間コース" | "夜間主コース" }
	| { faculty: "人文社会科学部" };

export type PartialEducationFacultyValue =
	| EducationFacultyValue
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "発達教育学専攻";
			subspecialty: "教育実践学専修" | "教育心理学専修" | "幼児教育専修";
	  }
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "教科教育学専攻";
			subspecialty:
				| "国語教育専修"
				| "社会科教育専修"
				| "数学教育専修"
				| "理科教育専修"
				| "音楽教育専修"
				| "美術教育専修"
				| "保健体育教育専修"
				| "技術教育専修"
				| "家庭科教育専修"
				| "英語教育専修";
	  }
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major:
				| "発達教育学専攻"
				| "初等学習開発学専攻"
				| "養護教育専攻"
				| "特別支援教育専攻"
				| "教科教育学専攻";
	  }
	| { faculty: "教育学部"; program: "学校教育教員養成課程" }
	| { faculty: "教育学部" };

export type PartialInformaticsFacultyValue =
	| InformaticsFacultyValue
	| {
			faculty: "情報学部";
			department: "情報科学科" | "行動情報学科" | "情報社会学科";
	  }
	| { faculty: "情報学部" };

export type PartialScienceFacultyValue =
	| ScienceFacultyValue
	| {
			faculty: "理学部";
			department: "数学科" | "物理学科" | "化学科" | "生物科学科" | "地球科学科";
	  }
	| { faculty: "理学部"; course: "創造理学コース" }
	| { faculty: "理学部" };

export type PartialEngineeringFacultyValue =
	| EngineeringFacultyValue
	| {
			faculty: "工学部";
			department: "機械工学科";
			course:
				| "宇宙・環境コース"
				| "知能・材料コース"
				| "電気機械システムコース";
	  }
	| {
			faculty: "工学部";
			department: "電気電子工学科";
			course: "情報エレクトロニクスコース" | "エネルギー・電子制御コース";
	  }
	| {
			faculty: "工学部";
			department: "電子物質科学科";
			course: "電子物理デバイスコース" | "材料エネルギー化学コース";
	  }
	| {
			faculty: "工学部";
			department: "化学バイオ工学科";
			course: "環境応用化学コース" | "バイオ応用工学コース";
	  }
	| {
			faculty: "工学部";
			department:
				| "機械工学科"
				| "電気電子工学科"
				| "電子物質科学科"
				| "化学バイオ工学科"
				| "数理システム工学科";
	  }
	| { faculty: "工学部" };

export type PartialAgricultureFacultyValue =
	| AgricultureFacultyValue
	| {
			faculty: "農学部";
			department: "生物資源科学科";
			course: "バイオサイエンスコース" | "環境サイエンスコース";
	  }
	| {
			faculty: "農学部";
			department: "生物資源科学科" | "応用生命科学科";
	  }
	| { faculty: "農学部" };

export type PartialGlobalCoCreationFacultyValue =
	| GlobalCoCreationFacultyValue
	| {
			faculty: "グローバル共創科学部";
			department: "グローバル共創科学科";
			course:
				| "国際地域共生学コース"
				| "生命圏循環共生学コース"
				| "総合人間科学コース";
	  }
	| {
			faculty: "グローバル共創科学部";
			department: "グローバル共創科学科";
	  }
	| { faculty: "グローバル共創科学部" };

export type PartialRegionalDevelopmentValue =
	| RegionalDevelopmentValue
	| { faculty: "地域創造学環" };

export type PartialUndergraduateAffiliationValue =
	| PartialHumanitiesFacultyValue
	| PartialEducationFacultyValue
	| PartialInformaticsFacultyValue
	| PartialScienceFacultyValue
	| PartialEngineeringFacultyValue
	| PartialAgricultureFacultyValue
	| PartialGlobalCoCreationFacultyValue
	| PartialRegionalDevelopmentValue;

// ── 修士課程（Master）部分型 ──

export type PartialHumanitiesMasterValue =
	| HumanitiesMasterValue
	| {
			school: "人文社会科学研究科";
			major: "臨床人間科学専攻";
			course: "臨床心理学コース" | "臨床人間科学コース";
	  }
	| {
			school: "人文社会科学研究科";
			major: "比較地域文化専攻";
			course: "歴史・文化論コース" | "言語文化論コース";
	  }
	| {
			school: "人文社会科学研究科";
			major: "経済専攻";
			course: "国際経営コース" | "地域公共政策コース";
	  }
	| {
			school: "人文社会科学研究科";
			major: "臨床人間科学専攻" | "比較地域文化専攻" | "経済専攻";
	  }
	| { school: "人文社会科学研究科" };

export type PartialIntegratedSciTechMasterValue =
	| IntegratedSciTechMasterValue
	| {
			school: "総合科学技術研究科";
			major: "情報学専攻";
			course: "基盤情報学コース" | "領域情報学コース";
	  }
	| {
			school: "総合科学技術研究科";
			major: "理学専攻";
			course:
				| "数学コース"
				| "物理学コース"
				| "化学コース"
				| "生物科学コース"
				| "地球科学コース";
	  }
	| {
			school: "総合科学技術研究科";
			major: "工学専攻";
			course:
				| "機械工学コース"
				| "電気電子工学コース"
				| "電子物質科学コース"
				| "化学バイオ工学コース"
				| "数理システム工学コース"
				| "事業開発マネジメントコース";
	  }
	| {
			school: "総合科学技術研究科";
			major: "農学専攻";
			course:
				| "生物資源科学コース"
				| "応用生命科学コース"
				| "環境森林科学コース";
	  }
	| {
			school: "総合科学技術研究科";
			major: "情報学専攻" | "理学専攻" | "工学専攻" | "農学専攻";
	  }
	| { school: "総合科学技術研究科" };

export type PartialMountainWatershedValue =
	| MountainWatershedValue
	| { school: "山岳流域研究院" };

export type PartialMasterAffiliationValue =
	| PartialHumanitiesMasterValue
	| PartialIntegratedSciTechMasterValue
	| PartialMountainWatershedValue;

// ── 博士課程（Doctoral）部分型 ──

export type PartialCreativeSciTechDoctoralValue =
	| CreativeSciTechDoctoralValue
	| {
			school: "創造科学技術大学院";
			major:
				| "ナノビジョン工学専攻"
				| "光・ナノ物質機能専攻"
				| "情報科学専攻"
				| "環境・エネルギーシステム専攻"
				| "バイオサイエンス専攻";
	  }
	| { school: "創造科学技術大学院" };

export type PartialEducationDoctoralValue =
	| EducationDoctoralValue
	| { school: "教育学研究科"; major: "共同教科開発学専攻" }
	| { school: "教育学研究科" };

export type PartialOptoBiomedicalDoctoralValue =
	| OptoBiomedicalDoctoralValue
	| { school: "光医工学研究科"; major: "光医工学共同専攻" }
	| { school: "光医工学研究科" };

export type PartialDoctoralAffiliationValue =
	| PartialCreativeSciTechDoctoralValue
	| PartialEducationDoctoralValue
	| PartialOptoBiomedicalDoctoralValue;

// ── 専門職学位課程（Professional）部分型 ──

export type PartialProfessionalAffiliationValue =
	| ProfessionalAffiliationValue
	| { school: "教育学研究科"; major: "教育実践高度化専攻" }
	| { school: "教育学研究科" };
