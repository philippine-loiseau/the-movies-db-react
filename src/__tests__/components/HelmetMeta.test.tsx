import React from 'react';
import {render} from '@testing-library/react';
import HelmetMeta from '../../components/UX/HelmetMeta/HelmetMeta';
import {Helmet} from 'react-helmet';

describe('HelmetMeta', () => {
  it('sets the title and description based on props', () => {
    const testTitle = 'Test Title';
    const testDescription = 'Test Description';

    render(<HelmetMeta title={testTitle} description={testDescription}/>);

    const helmet = Helmet.peek();

    expect(helmet.title).toEqual(testTitle);
    expect(
      helmet.metaTags.find((tag: any) => tag.name === 'description')?.content
    ).toEqual(testDescription);
  });

  it('updates the title and description when props change', () => {
    const {rerender} = render(
      <HelmetMeta title="Initial Title" description="Initial Description"/>
    );

    let helmet = Helmet.peek();
    expect(helmet.title).toEqual('Initial Title');
    expect(
      helmet.metaTags.find((tag: any) => tag.name === 'description')?.content
    ).toEqual('Initial Description');

    rerender(
      <HelmetMeta title="Updated Title" description="Updated Description"/>
    );

    helmet = Helmet.peek();
    expect(helmet.title).toEqual('Updated Title');
    expect(
      helmet.metaTags.find((tag: any) => tag.name === 'description')?.content
    ).toEqual('Updated Description');
  });
});
