import { format, yearsToMonths } from "date-fns";
import { inject, injectable } from "tsyringe";
import { IBalanceConstructionRepository } from "../../shared/interfaces/repositories/IBalanceConstructionRepository";
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
		@inject('BalanceConstructionRepository')
		private balanceConstructionRepository: IBalanceConstructionRepository
	) { }

	public async execute(constructionId: number, position: string, accessToken: string) {
		try {
			// await this.handleContent.getUser(accessToken, position, DataTypeGetUser.graphic.entity, DataTypeGetUser.action.read);

			const materialPrice = await this.materialPriceRepository.listMaterialPrice(constructionId);

			const manpowerPrice = await this.manpowerPriceRepository.listManpowerPrice(constructionId);

			const stagePrice = await this.stagePriceRepository.listStagePrice(constructionId);

			const balanceConstruction = await this.balanceConstructionRepository.listBalanceConstruction(constructionId);

			let tablePrices: any = [...materialPrice, ...manpowerPrice, ...stagePrice];

			let creationDate: string;

			tablePrices.map((value) => {
				creationDate = format(new Date(value.creation_date), 'yyyy-MM-dd');
				let [year, month, day] = creationDate.split('-');

				for (const monthValue of months) {
					if (amountForMonths[monthValue]?.type?.includes(month)) {
						amountForMonths[monthValue].price += value.amount ? +value.amount : +value.unit_price * +value.quantity;
						break;
					}
				}
			});
			
			balanceConstruction.map(value => {
				for (const monthValue of months) {
					if (monthValue === value.month) {
						amountForMonths[monthValue].balance += +value.amount;
						break;
					}
				}
			});


			return {
				status: 200,
				data: amountForMonths
			}
		} catch (error) {			
			if (error.event) {
                error = error.event;
            }
            throw {
                status: error.status,
                data: {
                    event: {
                        code: error.code,
                        type: error.eventType,
                        message: error.message,
                        details: error.detail
                    }
                }
            };
		}
	}
}

export default ListCostsForMonthsService;