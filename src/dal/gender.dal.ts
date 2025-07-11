import BaseDal from "./base.dal";

type GenderDalType = {
    id: number,
    sex: string
}

class GenderDal extends BaseDal<GenderDalType> {

    fromDto(dto: GenderDalType[], cb?: (...args: any) => void): Array<{ id: number | string; name: string; }> {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.sex
            }
        })
    }
};

export default GenderDal;