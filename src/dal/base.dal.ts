abstract class BaseDal<TDto, TReturn> {
  abstract fromDto(dto: TDto[]) : TReturn[];
}

export default BaseDal;