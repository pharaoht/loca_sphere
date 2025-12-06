import BaseDal from "./base.dal"

export type CurrencyDalType = {
    id: number
    symbol: string
    code: string
}

export type CurrencyDalReturnType = {
    id: number
    name: string
}

class CurrencyDal extends BaseDal<CurrencyDalType, CurrencyDalReturnType> {

    fromDto(dto: CurrencyDalType[]): CurrencyDalReturnType[] {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: `${itm.symbol} ${itm.code}`
            }
        });

    }
};

export default CurrencyDal;