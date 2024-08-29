
interface BreadcrumbProps {
    breadcrumbs: string | JSX.Element;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {

    return (
        <>
            {breadcrumbs ? breadcrumbs : 'Dashboard'}
        </>
    );
}


export default Breadcrumb;