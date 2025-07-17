import BaseDal from "./base.dal";

type ListingType = {
    id: number | string;
    name: string
};

class ListingTypeDal extends BaseDal<ListingType> {

    fromDto(dto: ListingType[]): Array<{ id: number | string; name: string; }> {
        
        return dto.map((itm, idx) => {

            return {
                id: itm.id,
                name: itm.name
            }
        })
    }
};

export default ListingTypeDal;