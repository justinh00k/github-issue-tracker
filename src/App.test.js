import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import IssueTracker from './app/IssueTracker'

it('renders a snapshot', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('issue tracker loads even if user has no repos', () => {
  const tree = renderer.create(<IssueTracker user="" password="" repos={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
