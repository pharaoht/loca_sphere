import BaseDal from "./base.dal";

type AmenityType = {
    id: number,
    amenityName: string
}

class AmenityTypeDal extends BaseDal<AmenityType> {

    fromDto(dto: AmenityType[], cb?: (...args: any) => void): Array<{ id: number | string; name: string; }> {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.amenityName
            }
        })
    }
}

export default AmenityTypeDal;