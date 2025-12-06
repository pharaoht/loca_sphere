import BaseDal from "./base.dal";

type HouseRulesType = {
    id: number,
    ruleName: string,
    icon: string
}

type HouseRulesReturnType = {
    id: number,
    name: string,
    icon: string
}

class HouseRulesDal extends BaseDal<HouseRulesType, HouseRulesReturnType> {

    fromDto(dto: HouseRulesType[], cb?: (...args: any) => void): HouseRulesReturnType[] {
        
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