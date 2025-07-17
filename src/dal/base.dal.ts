abstract class BaseDal<TDto> {


    abstract fromDto(dto: TDto[], cb?: (...args: any) => void): Array<{ id: number | string, name: string }>
};

export default BaseDal;