import BaseDal from "./base.dal";

type ListingType = {
    id: number | string;
    name: string
};

type ListingReturnType = {
    id: number | string;
    name: string
};

class ListingTypeDal extends BaseDal<ListingType, ListingReturnType> {

    fromDto(dto: ListingType[]): ListingReturnType[] {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.name
            }
        })
    }
};

export default ListingTypeDal;