import styles from '../gridtable.module.css';
import TableBody from '../tbody/tbody';
import TableColumnHeader from '../theader/theader';

interface TableProps {
    tableTitle: string
    columnNames: Array<string>
    tableData: Array<any>
}
const GridTable = ({ columnNames, tableData, tableTitle, }: TableProps) => {
    const test = () => {}
    return (
        <table className={styles.tableContainer}>
            <caption>{tableTitle}</caption>
            <TableColumnHeader columnNames={columnNames}/>
            <TableBody data={tableData} onClickHandler={test}/>
        </table>
    )
};

export default GridTable;