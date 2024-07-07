import React, {useState, useEffect} from 'react';
import Helmet from 'react-helmet';

const HelmetMeta: React.FC<{
  title: string;
  description: string;
}> = (props: {
  title: string;
  description: string;
}) => {
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');

  useEffect(() => {
    if (props.title) {
      setPageTitle(props.title);
    }
    if (props.description) {
      setPageDescription(props.description);
    }
  }, [props.title, props.description]);

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription}/>
      </Helmet>
    </div>
  );
};

export default HelmetMeta;
