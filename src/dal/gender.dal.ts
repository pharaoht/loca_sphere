import BaseDal from "./base.dal";

type GenderDalType = {
    id: number,
    sex: string
}

type GenderDalReturnType = {
    id: number,
    name: string
}

class GenderDal extends BaseDal<GenderDalType, GenderDalReturnType> {

    fromDto(dto: GenderDalType[], cb?: (...args: any) => void): GenderDalReturnType[] {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.sex
            }
        })
    }
};

export default GenderDal;