import React from 'react';
import SidebarLinkGroup from './SidebarLinkGroup';
import { NavLink } from 'react-router-dom';

interface SidebarTemplateProps {
  menu: {
    name: string;
    path: string;
    icon: any;
    subs?: Array<{ name: string; path: string; icon?: any }>;
  };
  pathname: string;
  sidebarExpanded: boolean;
  setSidebarExpanded: (x: boolean) => void;
  setSidebarOpen: (x: boolean) => void;
}

const SidebarTemplate = ({
  menu,
  pathname,
  sidebarExpanded,
  setSidebarExpanded,
  setSidebarOpen,
}: SidebarTemplateProps) => {
  if (menu.subs?.length) {
    return (
      <SidebarLinkGroup activeCondition={pathname === `/${menu.path}` || pathname.includes(menu.path)}>
        {(handleClick, open) => {
          return (
            <React.Fragment>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-sidebar-active dark:hover:bg-meta-4 ${
                  (pathname === `/${menu.path}` || pathname.includes(`/${menu.path}`)) &&
                  'bg-sidebar-active dark:bg-meta-4'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                }}
              >
                <span className="w-6">{menu.icon}</span> {menu.name}
                <svg
                  className={`absolute right-0 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                  />
                </svg>
              </NavLink>

              <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                  {menu.subs?.map((sub) => (
                    <li key={sub.path}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          'group relative flex items-center gap-2.5 rounded-md px-4 py-0.5 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                          (isActive && '!text-white')
                        }
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="w-5">{sub.icon}</span> {sub.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          );
        }}
      </SidebarLinkGroup>
    );
  }
  return (
    <li>
      <NavLink
        to={menu.path}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-sidebar-active dark:hover:bg-meta-4 ${
          pathname.includes(menu.path) && 'bg-sidebar-active dark:bg-meta-4'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <span className="w-6">{menu.icon}</span>
        {menu.name}
      </NavLink>
    </li>
  );
};

export default SidebarTemplate;
