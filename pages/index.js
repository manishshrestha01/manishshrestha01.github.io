import React, { useEffect, useState } from 'react';
import Ubuntu from '../components/ubuntu';
import Meta from '../components/SEO/Meta';

function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Meta />
      {isClient ? <Ubuntu /> : <div>Loading...</div>}
    </>
  );
}

export default Home;
