import { useSelector } from 'react-redux';

import { getContacts } from 'redux/selectors';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { GlobalStyle } from './GlobalStyles';
import { Wrapper, Title, Caption } from './App.styled';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Wrapper>
      <GlobalStyle />
      <Title>Phonebook</Title>
      <ContactForm />
      <Caption>Contacts</Caption>
      <Filter />
      {contacts.length > 0 && <ContactList />}
    </Wrapper>
  );
};
