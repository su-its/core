import type { Faculty } from "./Faculty";

export interface FacultyRepository {
	findByName(name: string): Promise<Faculty | null>;
	findAll(): Promise<Faculty[]>;
	save(faculty: Faculty): Promise<void>;
	delete(name: string): Promise<void>;
}
