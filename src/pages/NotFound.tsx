import Logo from '@/assets/logo/logo.png';
// import LinkButton from '@/components/Link';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center text-gray-700 dark:text-gray-300">
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-bold text-red-600 dark:text-red-400">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-6 text-lg">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {/* <LinkButton to="/" variant="info">
          Go to Home
        </LinkButton>
        <LinkButton to="/help" variant="info-outline">
          Visit Help Center
        </LinkButton> */}
      </div>
    </div>
    <div className="mt-5">
      <img src={Logo} alt="CF+" width={250} />
    </div>
  </div>
);

export default NotFound;
