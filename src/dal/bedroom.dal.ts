import BaseDal from "./base.dal";

export type BedroomAmenityType = {
    id: number;
    name: string;
    icon: string;
}

export type BedroomAmenityReturnType = {
    id: number;
    name: string;
    icon: string;
}

class BedroomAmenityDal extends BaseDal<BedroomAmenityType, BedroomAmenityReturnType> {

    fromDto(dto: BedroomAmenityType[], cb?: (...args: any) => void): BedroomAmenityReturnType[] {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.name,
                icon: itm.icon
            }
        })
    }
};

export default BedroomAmenityDal;