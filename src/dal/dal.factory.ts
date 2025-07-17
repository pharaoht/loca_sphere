import BaseDal from "./base.dal";
import BedroomAmenityDal from "./bedroom.dal";
import CurrencyDal from "./currency.dal";
import GenderDal from "./gender.dal";
import ListingTypeDal from "./listingType.dal";

const dalMap: Record<string, () => BaseDal<any>> = {
	currency: () => new CurrencyDal(),
    listingType: () => new ListingTypeDal(),
	gender: () => new GenderDal(),
	bedroomAmenity: () => new BedroomAmenityDal(),
	all: () => new ListingTypeDal(),
};

export class DalFactory {
	static create(option: string): BaseDal<any> {

		const dalCreator = dalMap[option];
	
		if (!dalCreator) {
			
			return dalMap.all()
		}

		return dalCreator();
	}
}
