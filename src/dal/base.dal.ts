abstract class BaseDal<TDto> {


    abstract fromDto(dto: TDto[], cb?: (...args: any) => void): Array<{ id: number | string, name: string, icon: string }>
};

export default BaseDal;