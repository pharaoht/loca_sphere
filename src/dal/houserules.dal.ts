import BaseDal from "./base.dal";

type HouseRulesType = {
    id: number,
    ruleName: string,
    icon: string
}

class HouseRulesDal extends BaseDal<HouseRulesType> {

    fromDto(dto: HouseRulesType[], cb?: (...args: any) => void): Array<{ id: number | string; name: string; }> {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.ruleName,
                icon: itm.icon
            }
        })
    }
};

export default HouseRulesDal;