import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import React from 'react';

type Props = {
  people: Person[];
  selectedPersonSlug: string | null;
  onSelectPerson: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  onSelectPerson,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedPersonSlug,
              })}
              onClick={() => onSelectPerson(person.slug)}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
