export default function Settings() {
  return (
    <>
      <h1 className="mb-2 text-lg font-semibold">System Settings</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* {Array.from({ length: 12 }).map((_, index) => ( */}
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
          <a href="#">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Manage User Roles and Permissions
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Control access to various features by assigning roles to users.
            Customize permissions to ensure that each role has the right level
            of access.
          </p>
          <a
            href="/weee/settings/roleSettings"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Role Settings
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        {/* ))} */}
      </div>
    </>
  );
}
