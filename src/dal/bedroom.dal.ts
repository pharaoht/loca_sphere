import BaseDal from "./base.dal";

type BedroomAmenityType = {
    id: number;
    name: string;
    icon: string;
}

class BedroomAmenityDal extends BaseDal<BedroomAmenityType> {

    fromDto(dto: BedroomAmenityType[], cb?: (...args: any) => void): Array<{ id: number | string; name: string; }> {
        
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