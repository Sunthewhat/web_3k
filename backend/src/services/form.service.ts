import { PrismaClient, type regisTracking } from '@prisma/client';
import type { IFormData, IUrlEntry } from '../model/formdata';

interface IFormService {
	sendForm(data: IFormData, email: string): Promise<any>;
	decodeEntry(): IUrlEntry;
}
class FormService implements IFormService {
	prisma = new PrismaClient();

	async getDataByInstituteAndSport(
		institute: string,
		sport: string
	): Promise<regisTracking[]> {
		const response = await this.prisma.regisTracking.findMany({
			where: {
				institute: institute,
				sport: sport,
			},
		});
		return response;
	}

	async getStatus(institute: string): Promise<regisTracking[]> {
		const response = await this.prisma.regisTracking.findMany({
			where: {
				institute: institute,
			},
		});
		return response;
	}

	async sendForm(data: IFormData, email: string): Promise<any> {
		const urlStart =
			process.env.ENV == 'prod'
				? process.env.PROD_FORM_LINK_START
				: process.env.DEV_FORM_LINK_START;
		const urlEnd = '&submit=Submit';
		const entry = this.decodeEntry();
		const url = `${urlStart}&entry.${entry.university}=${
			data.university
		}&entry.${entry.sport}=${this.sportTranslate(data.sport)}&entry.${
			entry.sportType
		}=${this.sportTypeTranslate(data.sportType)}&entry.${
			entry.team
		}=${this.teamTranslate(data.team)}&entry.${entry.role}=${
			data.role
		}&entry.${entry.number}=${data.number}&entry.${entry.prefix}=${
			data.prefix
		}&entry.${entry.name}=${data.name}&entry.${entry.shirt}=${
			data.shirt
		}&entry.${entry.pants}=${data.pants}&entry.${entry.phone}=${
			data.phone
		}&entry.${entry.studentId}=${data.studentId}&entry.${entry.allergies}=${
			data.allergies
		}&entry.${entry.email}=${email}
		${urlEnd}`;
		const response = await fetch(url);
		return response;
	}
	teamTranslate(tm: string): string {
		//'solo' | 'duo' | 'team' | 'ROV' | 'Valorant'
		switch (tm) {
			case 'solo':
				return 'เดี่ยว';
			case 'duo':
				return 'คู่';
			case 'team':
				return 'ทีม';
			case 'ROV':
				return 'ROV';
			case 'Valorant':
				return 'Valorant';
			default:
				return '-';
		}
	}

	sportTypeTranslate(st: string): string {
		//'male' | 'female' | 'mix' | 'none'
		switch (st) {
			case 'male':
				return 'ชาย';
			case 'female':
				return 'หญิง';
			case 'mix':
				return 'ผสม';
			case 'none':
				return '-';
			default:
				return '-';
		}
	}

	sportTranslate(sp: string): string {
		switch (sp) {
			case 'basketball':
				return 'บาสเกตบอล';
			case 'football':
				return 'ฟุตบอล';
			case 'futsal':
				return 'ฟุตซอล';
			case 'volleyball':
				return 'วอลเลย์บอล';
			case 'badminton':
				return 'แบดมินตัน';
			case 'table tennis':
				return 'เทเบิลเทนนิส';
			case 'bridge':
				return 'บริดจ์';
			case 'esport':
				return 'อีสปอร์ต';
			case 'petanque':
				return 'เปตอง';
			default:
				return '-';
		}
	}

	decodeEntry(): IUrlEntry {
		const university = process.env.ENTRY_UNIVERSITY || '';
		const sport = process.env.ENTRY_SPORT || '';
		const sportType = process.env.ENTRY_SPORT_TYPE || '';
		const team = process.env.ENTRY_TEAM || '';
		const role = process.env.ENTRY_ROLE || '';
		const number = process.env.ENTRY_NUMBER || '';
		const prefix = process.env.ENTRY_PREFIX || '';
		const name = process.env.ENTRY_NAME || '';
		const shirt = process.env.ENTRY_SHIRT || '';
		const pants = process.env.ENTRY_PANTS || '';
		const phone = process.env.ENTRY_PHONE || '';
		const studentId = process.env.ENTRY_STUDENT_ID || '';
		const allergies = process.env.ENTRY_ALLERGIES || '';
		const email = process.env.ENTRY_EMAIL || '';

		return {
			university,
			sport,
			sportType,
			team,
			role,
			number,
			prefix,
			name,
			shirt,
			pants,
			phone,
			studentId,
			allergies,
			email,
		};
	}
}

export default new FormService();
