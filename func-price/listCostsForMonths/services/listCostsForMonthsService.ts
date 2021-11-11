import { format, yearsToMonths } from "date-fns";
import { inject, injectable } from "tsyringe";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";
import { amountForMonths, months } from "../utils/monthsAndAmount";

@injectable()
class ListCostsForMonthsService {

	constructor(
		@inject('MaterialPriceRepository')
		private materialPriceRepository: IMaterialPriceRepository,
		@inject('ManpowerPriceRepository')
		private manpowerPriceRepository: IManpowerPriceRepository,
		@inject('StagePriceRepository')
		private stagePriceRepository: IStagePriceRepository,
		@inject('HandleContent')
		private handleContent: IHandleContent,
	) { }

	public async execute(constructionId: number, position: string, accessToken: string) {
		try {
			await this.handleContent.getUser(accessToken, position, DataTypeGetUser.graphic.entity, DataTypeGetUser.action.read);

			const materialPrice = await this.materialPriceRepository.listMaterialPrice(constructionId);

			const manpowerPrice = await this.manpowerPriceRepository.listManpowerPrice(constructionId);

			const stagePrice = await this.stagePriceRepository.listStagePrice(constructionId);

			let tablePrices: any = [...materialPrice, ...manpowerPrice, ...stagePrice];

			let creationDate: string;

			tablePrices.map((value) => {
				creationDate = format(new Date(value.creation_date), 'yyyy-MM-dd');
				let [year, month, day] = creationDate.split('-');

				for (const monthValue of months) {
					if (amountForMonths[monthValue]?.type?.includes(month)) {
						amountForMonths[monthValue].amount += value.amount ? +value.amount : +value.unit_price * +value.quantity;
						break;
					}
				}
			});

			return {
				status: 200,
				data: amountForMonths
			}
		} catch (error) {
			throw error;
		}
	}
}

export default ListCostsForMonthsService;