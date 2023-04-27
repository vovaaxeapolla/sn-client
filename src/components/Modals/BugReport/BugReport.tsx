import styles from './BugReport.module.sass';
import { Button } from '../../../UI/kit';

interface BugReportProps {
    onClick: Function
}

const BugReport: React.FC<BugReportProps> = ({ }) => {
    return (
        <div className={styles.BugReport}>
            <textarea placeholder='Опишите ошибку'></textarea>
            <Button submit onClick={() => 1}>Отправить</Button>
        </div>
    );
}
export default BugReport;