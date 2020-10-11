import React from 'react';

import Adapter from 'enzyme-adapter-react-16'; 
import Enzyme, { mount } from 'enzyme';
import { render, fireEvent,  } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

import { Provider } from 'react-redux';
import { store } from './store';

import Header from './Containers/Header';
import DataTable from './Components/DataTable';
import DataTableRow from './Components/DataTableRow';
import SkillListMenu from './Components/SkillListMenu';

import {
	createEmployee, 
	updateEmployee, 
	deleteEmployee 
} from './graphql/mutations';
// import {
// 	updateField
// } from './actions';

Enzyme.configure({ adapter: new Adapter() });


test('Header', () => {
	const { getByText } = render(<Header />);
	const headerTitle = getByText('BOPS');
	expect(headerTitle).toBeVisible();
});

describe('DataTable', () => {
	const tableTitle = 'Data Table Test';

	const columns = [
		{ id: 'firstname', label: 'First Name', minWidth: 170 },
		{ id: 'lastname', label: 'Last Name', minWidth: 100 },
		{
			id: 'skills',
			label: 'Skills',
			minWidth: 170,
		},

	];

	const mocks = [
		{
		  request: {
			query: gql(updateEmployee),
			variables: {
			  	input: {
					firstname: 'gary',
					lastname: 'li',
					id: 'idhere',
					skills: [],
			  	}
			},
		  },
		  result: {
			data: {
			  dog: { id: '1', name: 'Buck', breed: 'bulldog' },
			},
		  },
		},
	  ];

	const rows = [
		{
			id: 1,
			firstname: 'Test',
			lastname: 'ing',
			skills: [
				{
					id: 1,
					name: 'skill1',
				},
			]
		},
	];

	describe('table rendering', () => {
		it('title', () => {
			const { getByText } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle={tableTitle}
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			expect(getByText(tableTitle)).toBeVisible();
		});

		it('table column headers', () => {
			const { getByText } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle={tableTitle}
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			const tableRow = getByText('First Name').closest('tr');

			expect(tableRow).toHaveTextContent('First Name');
			expect(tableRow).toHaveTextContent('Last Name');
			expect(tableRow).toHaveTextContent('Skills');
		});

		it('add skill button', () => {
			const { getByText } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle={tableTitle}
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			const button = getByText('Add Skill').closest('button');

			expect(button).toHaveTextContent('Add Skill');
			// expect(tableRow).toHaveTextContent('Delete');
		});

		it('delete button', () => {
			const { getByText } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle={tableTitle}
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			const button = getByText('Delete').closest('button');

			expect(button).toHaveTextContent('Delete');
		});

		it('DataTableRow buttons', () => {
			const { container } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle='Data Table Test'
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			
			const buttons = container.querySelectorAll('button');

			expect(buttons[0]).toHaveTextContent('Add Skill');
			expect(buttons[1]).toHaveTextContent('Delete');
		});


		it('confirm for Delete button', () => {
			const { getByText, container } = render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<DataTable
							tableTitle='Data Table Test'
							rows={rows}
							columns={columns}
						/>
					</Provider>
				</MockedProvider>
			);

			const event = document.createEvent("SVGEvents");
			event.initEvent("click",true,true);
			
			const openMenu = container.querySelector('svg');
			openMenu.dispatchEvent(event);

			window.confirm = jest.fn();
			
			
			const deleteButton = getByText('Delete').closest('button');
			
			fireEvent.click(deleteButton);

			expect(window.confirm).toHaveBeenCalledTimes(1);
		});

		it('add skill works', () => {
			const wrapper = mount(
				<MockedProvider mocks={mocks} addTypename={false}>
					<Provider store={store}>
						<SkillListMenu
							employeeSkills={rows[0].skills}
							setEdited={false}
							info={{
								firstname: rows[0].firstname,
								lastname: rows[0].lastname,
							}}
						/>
					</Provider>
				</MockedProvider>
			);

			wrapper.find('input').simulate('change',  { target: { value: 'skillsx1' } });
			wrapper.find('button').simulate('click');
		});
	});
});
