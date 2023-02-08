import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyle } from './GlobalStyles';
import { Wrapper, Title, Caption } from './App.styled';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContactItem = ({ name, number }) => {
    const isIncludesName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!isIncludesName) {
      setContacts(prevState => {
        const contact = {
          id: nanoid(),
          name,
          number,
        };
        return [contact, ...prevState];
      });
    } else alert(`${name} is already in contacts`);
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const filterContactItem = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterItem = contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
    return filterItem;
  };

  const deleteContactItem = itemId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== itemId));
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Title>Phonebook</Title>
      <ContactForm onSubmit={createContactItem} />
      <Caption>Contacts</Caption>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <ContactList items={filterContactItem()} onDelete={deleteContactItem} />
      )}
    </Wrapper>
  );
};
