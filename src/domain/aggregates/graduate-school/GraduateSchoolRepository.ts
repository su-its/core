import type { GraduateSchool } from "./GraduateSchool";

export interface GraduateSchoolRepository {
	findByName(name: string): Promise<GraduateSchool | null>;
	findAll(): Promise<GraduateSchool[]>;
	save(school: GraduateSchool): Promise<void>;
	delete(name: string): Promise<void>;
}
