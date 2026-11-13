interface ComponentProps {
    data: Array<any>
    onClickHandler: (...args: any) => void
}
const TableBody = ({ data, onClickHandler }: ComponentProps) => {

    return (
        <tbody>

        </tbody>
    )
};

export default TableBody