import BaseDal from "./base.dal"

type CurrencyDalType = {
    id: number
    symbol: string
    code: string
}

class CurrencyDal extends BaseDal<CurrencyDalType> {

    fromDto(dto: CurrencyDalType[]): Array<{ id: number | string; name: string; }> {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: `${itm.symbol} ${itm.code}`
            }
        });

    }
};

export default CurrencyDal;