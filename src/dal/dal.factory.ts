import AmenityTypeDal from "./amenity.dal";
import BaseDal from "./base.dal";
import BedroomAmenityDal from "./bedroom.dal";
import CurrencyDal from "./currency.dal";
import GenderDal from "./gender.dal";
import HouseRulesDal from "./houserules.dal";
import ListingTypeDal from "./listingType.dal";

export type DalMap = {
	currency: CurrencyDal;
	listingType: ListingTypeDal;
	gender: GenderDal;
	bedroomAmenity: BedroomAmenityDal;
	houseRules: HouseRulesDal;
	amenity: AmenityTypeDal;
	amenityType: AmenityTypeDal;
	all: ListingTypeDal;
};


const dalMap: { [K in keyof DalMap]: () => DalMap[K] } = {
	currency: () => new CurrencyDal(),
    listingType: () => new ListingTypeDal(),
	gender: () => new GenderDal(),
	bedroomAmenity: () => new BedroomAmenityDal(),
	houseRules: () => new HouseRulesDal(),
	amenity: () => new AmenityTypeDal(),
	amenityType: () => new AmenityTypeDal(),
	all: () => new ListingTypeDal(),
};

export class DalFactory {

	static create<K extends keyof DalMap>(option: K): DalMap[K] {
		const creator = dalMap[option] ?? dalMap.all
		return creator();
	}
}
