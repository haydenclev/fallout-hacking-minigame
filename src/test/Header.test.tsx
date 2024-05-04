import { render } from '@testing-library/react';
import Header from '../components/Header';


it('shows warning message when one guess remaining', () => {
  const header = render(<Header guessCount={3} guessLimit={4}/>)
  const warning = header.queryByText('!!! warning: lockout imminent !!!')
  expect(warning).toBeInTheDocument();
})

it('does not show warning message when more than one guess remaining', () => {
  const header = render(<Header guessCount={2} guessLimit={4}/>)
  const warning = header.queryByText('!!! warning: lockout imminent !!!')
  expect(warning).not.toBeInTheDocument();
})