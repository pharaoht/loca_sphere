import BaseDal from "./base.dal";

type AmenityType = {
    id: number,
    amenityName: string
}

type AmenityReturnType = {
    id: number,
    name: string
}

class AmenityTypeDal extends BaseDal<AmenityType, AmenityReturnType> {

    fromDto(dto: AmenityType[], cb?: (...args: any) => void): AmenityReturnType[] {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.amenityName
            }
        })
    }
}

export default AmenityTypeDal;