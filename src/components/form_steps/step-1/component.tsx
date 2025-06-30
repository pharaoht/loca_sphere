
interface Props {
    backHandler: (...args: any) => void;
}
const StepOneComponent: React.FC<Props> = ({ backHandler }) => {

    return (
        <div>
            step one
        </div>
    )
};


export default StepOneComponent;