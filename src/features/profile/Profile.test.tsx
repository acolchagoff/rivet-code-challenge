import { render, screen } from '@testing-library/react';
import { ProfileList } from './ProfileList';
import { ProfileShow } from './ProfileShow';
import { ProfileLineItem } from './ProfileLineItem';
import { Status } from './Status';
import Test from '../../Test';
import profiles from './testProfiles.json'

const state = {
    profile: { profiles }
}
describe('ProfileList', () => {
  test('Renders Philip Fry', () => {
    render(
      <Test state={state}>
        <ProfileList />
      </Test>
    );
    const header = screen.getByText("Philip Fry");
    expect(header).toBeInTheDocument();
  });
});

describe('ProfileShow', () => {
  test('Renders Form Inputs', () => {
    render(
      <Test state={state}>
        <ProfileShow open />
      </Test>
    );
    const notesInput = screen.getByText("Enter first name");
    expect(notesInput).toBeInTheDocument();
  });

  test('Calls onClose', () => {
    const onClose = jest.fn();
    render(
      <Test state={state}>
        <ProfileShow open onClose={onClose} />
      </Test>
    );
    const button = screen.getByText('Cancel');
    button.click();
    expect(onClose).toHaveBeenCalled();
  });
});

describe('ProfileLineItem', () => {
  test('Renders Amanda', () => {
    const user = profiles[1];
    render(
      <Test state={state}>
        <ProfileLineItem profile={user} />
      </Test>
    );
    const header = screen.getByText("Amanda Anderson");
    expect(header).toBeInTheDocument();
  });
});

describe('Status', () => {
  test('Renders Status', () => {
    render(
      <Test state={state}>
        <Status />
      </Test>
    );
    const header = screen.getByText("Listing 65 profile(s).");
    expect(header).toBeInTheDocument();
  });
})