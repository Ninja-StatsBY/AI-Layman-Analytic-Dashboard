import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CustomDashboard } from 'src/sections/custom_dashboard/view';



// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <CustomDashboard/>
    </>
  );
}
