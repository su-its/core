/**
 * 静岡大学の組織構造定義
 *
 * 各学部・研究科の階層を型レベルで表現する。
 * 分類子は実際の名称に対応: Faculty(学部), Department(学科), Program(課程),
 * Major(専攻), Course(コース), Subspecialty(専修)
 */

// ── 年次 ──

export type UndergraduateYear = 1 | 2 | 3 | 4;
export type MasterYear = 1 | 2;
export type DoctoralYear = 1 | 2 | 3;
export type ProfessionalYear = 1 | 2;

// ── 学部（Undergraduate） ──

export type HumanitiesFacultyValue =
	| {
			faculty: "人文社会科学部";
			enrollmentType: "昼間コース";
			department: "社会学科" | "言語文化学科" | "法学科" | "経済学科";
			year: UndergraduateYear;
	  }
	| {
			faculty: "人文社会科学部";
			enrollmentType: "夜間主コース";
			department: "法学科" | "経済学科";
			year: UndergraduateYear;
	  };

export type EducationFacultyValue =
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "発達教育学専攻";
			subspecialty: "教育実践学専修" | "教育心理学専修" | "幼児教育専修";
			year: UndergraduateYear;
	  }
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "初等学習開発学専攻";
			year: UndergraduateYear;
	  }
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "養護教育専攻";
			year: UndergraduateYear;
	  }
	| {
			faculty: "教育学部";
			program: "学校教育教員養成課程";
			major: "特別支援教育専攻";
			year: UndergraduateYear;
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
			year: UndergraduateYear;
	  };

export type InformaticsFacultyValue = {
	faculty: "情報学部";
	department: "情報科学科" | "行動情報学科" | "情報社会学科";
	year: UndergraduateYear;
};

export type ScienceFacultyValue =
	| {
			faculty: "理学部";
			department:
				| "数学科"
				| "物理学科"
				| "化学科"
				| "生物科学科"
				| "地球科学科";
			year: UndergraduateYear;
	  }
	| {
			faculty: "理学部";
			course: "創造理学コース";
			year: UndergraduateYear;
	  };

export type EngineeringFacultyValue =
	| {
			faculty: "工学部";
			department: "機械工学科";
			course:
				| "宇宙・環境コース"
				| "知能・材料コース"
				| "電気機械システムコース";
			year: UndergraduateYear;
	  }
	| {
			faculty: "工学部";
			department: "電気電子工学科";
			course: "情報エレクトロニクスコース" | "エネルギー・電子制御コース";
			year: UndergraduateYear;
	  }
	| {
			faculty: "工学部";
			department: "電子物質科学科";
			course: "電子物理デバイスコース" | "材料エネルギー化学コース";
			year: UndergraduateYear;
	  }
	| {
			faculty: "工学部";
			department: "化学バイオ工学科";
			course: "環境応用化学コース" | "バイオ応用工学コース";
			year: UndergraduateYear;
	  }
	| {
			faculty: "工学部";
			department: "数理システム工学科";
			year: UndergraduateYear;
	  };

export type AgricultureFacultyValue =
	| {
			faculty: "農学部";
			department: "生物資源科学科";
			course: "バイオサイエンスコース" | "環境サイエンスコース";
			year: UndergraduateYear;
	  }
	| {
			faculty: "農学部";
			department: "応用生命科学科";
			year: UndergraduateYear;
	  };

export type GlobalCoCreationFacultyValue = {
	faculty: "グローバル共創科学部";
	department: "グローバル共創科学科";
	course:
		| "国際地域共生学コース"
		| "生命圏循環共生学コース"
		| "総合人間科学コース";
	year: UndergraduateYear;
};

export type RegionalDevelopmentValue = {
	faculty: "地域創造学環";
	year: UndergraduateYear;
};

export type UndergraduateAffiliationValue =
	| HumanitiesFacultyValue
	| EducationFacultyValue
	| InformaticsFacultyValue
	| ScienceFacultyValue
	| EngineeringFacultyValue
	| AgricultureFacultyValue
	| GlobalCoCreationFacultyValue
	| RegionalDevelopmentValue;

// ── 修士課程（Master） ──

export type HumanitiesMasterValue =
	| {
			school: "人文社会科学研究科";
			major: "臨床人間科学専攻";
			course: "臨床心理学コース" | "臨床人間科学コース";
			year: MasterYear;
	  }
	| {
			school: "人文社会科学研究科";
			major: "比較地域文化専攻";
			course: "歴史・文化論コース" | "言語文化論コース";
			year: MasterYear;
	  }
	| {
			school: "人文社会科学研究科";
			major: "経済専攻";
			course: "国際経営コース" | "地域公共政策コース";
			year: MasterYear;
	  };

export type IntegratedSciTechMasterValue =
	| {
			school: "総合科学技術研究科";
			major: "情報学専攻";
			course: "基盤情報学コース" | "領域情報学コース";
			year: MasterYear;
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
			year: MasterYear;
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
			year: MasterYear;
	  }
	| {
			school: "総合科学技術研究科";
			major: "農学専攻";
			course:
				| "生物資源科学コース"
				| "応用生命科学コース"
				| "環境森林科学コース";
			year: MasterYear;
	  };

export type MountainWatershedValue = {
	school: "山岳流域研究院";
	year: MasterYear;
};

export type MasterAffiliationValue =
	| HumanitiesMasterValue
	| IntegratedSciTechMasterValue
	| MountainWatershedValue;

// ── 博士課程（Doctoral） ──

export type CreativeSciTechDoctoralValue = {
	school: "創造科学技術大学院";
	major:
		| "ナノビジョン工学専攻"
		| "光・ナノ物質機能専攻"
		| "情報科学専攻"
		| "環境・エネルギーシステム専攻"
		| "バイオサイエンス専攻";
	year: DoctoralYear;
};

export type EducationDoctoralValue = {
	school: "教育学研究科";
	major: "共同教科開発学専攻";
	year: DoctoralYear;
};

export type OptoBiomedicalDoctoralValue = {
	school: "光医工学研究科";
	major: "光医工学共同専攻";
	year: DoctoralYear;
};

export type DoctoralAffiliationValue =
	| CreativeSciTechDoctoralValue
	| EducationDoctoralValue
	| OptoBiomedicalDoctoralValue;

// ── 専門職学位課程（Professional） ──

export type ProfessionalAffiliationValue = {
	school: "教育学研究科";
	major: "教育実践高度化専攻";
	year: ProfessionalYear;
};
