import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';

jest.mock('../scenes/Movie/MovieLayout', () => ({children}) => <div>{children}</div>);
jest.mock('../routes/movie-routes', () => () => <div>Mocked Routes</div>);

describe('App', () => {
  it('renders without crashing and displays routes', () => {
    render(
      <App/>
    );
  });
});
