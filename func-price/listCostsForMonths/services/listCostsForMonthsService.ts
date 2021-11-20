import { format } from "date-fns";
import { inject, injectable } from "tsyringe";
import { IBalanceConstructionRepository } from "../../shared/interfaces/repositories/IBalanceConstructionRepository";
import { IManpowerPriceRepository } from "../../shared/interfaces/repositories/IManpowerPriceRepository";
import { IMaterialPriceRepository } from "../../shared/interfaces/repositories/IMaterialPriceRepository";
import { IStagePriceRepository } from "../../shared/interfaces/repositories/IStagePriceRepository";
import { IHandleContent } from "../../shared/interfaces/services/IHandleContent";
import { DataTypeGetUser } from "../../shared/utils/dataTypeGetUser";

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
			const { months, amountForMonths } = this.buildMonths();
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
			
			balanceConstruction.map(value => amountForMonths[value.month].balance += +value.amount);			
			
			let price = [];
			let balance = [];

			for (let index = 0; index < 12; index++) {				
				price.push({month: months[index], price: amountForMonths[months[index]].price});
				balance.push({month: months[index], balance: amountForMonths[months[index]].balance});
			}

			return {
				status: 200,
				data: {
					price: price.reverse(),
					balance: balance.reverse()
				}
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

	private buildMonths() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		const amountForMonths = {
			January: {
				type: '01',
				price: 0,
				balance: 0
			},
			February: {
				type: '02',
				price: 0,
				balance: 0
			},
			March: {
				type: '03',
				price: 0,
				balance: 0
			},
			April: {
				type: '04',
				price: 0,
				balance: 0
			},
			May: {
				type: '05',
				price: 0,
				balance: 0
			},
			June: {
				type: '06',
				price: 0,
				balance: 0
			},
			July: {
				type: '07',
				price: 0,
				balance: 0
			},
			August: {
				type: '08',
				price: 0,
				balance: 0
			},
			September: {
				type: '09',
				price: 0,
				balance: 0
			},
			October: {
				type: '10',
				price: 0,
				balance: 0
			},
			November: {
				type: '11',
				price: 0,
				balance: 0
			},
			December: {
				type: '12',
				price: 0,
				balance: 0
			},
		};

		return { months, amountForMonths };
	}
}

export default ListCostsForMonthsService;