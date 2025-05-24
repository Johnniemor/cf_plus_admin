import { isArray } from 'lodash';
import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  title: string;
  pageName?: string;
  backPath?: string | Array<string>;
  backName?: string | Array<string>;
}
const Breadcrumb = ({ title, pageName, backPath, backName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">{title}</h2>
      {backPath && (
        <nav>
          <ol className="flex items-center gap-2">
            {isArray(backPath) ? (
              backPath.map((item, index) => (
                <li key={index}>
                  <Link className="font-medium" to={item}>
                    {(backName as Array<string>)[index]} /
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <Link className="font-medium" to={backPath}>
                  {backName} /
                </Link>
              </li>
            )}
            <li className="font-medium text-primary">{pageName || title}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
