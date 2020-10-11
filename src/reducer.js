import * as types from './action-types';

const initialState = {
    userInput: {
        firstname: '',
        lastname: '',
    },
    skills: {},
    employees: [],
};

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch (action.type) {
        case types.UPDATE_EMPLOYEES:
            return {
                ...state,
                employees: action.employees,
            };

        case types.UPDATE_EMPLOYEE_SKILLS:
            return {
                ...state,
                employees: [
                    ...state.employees.slice(0, action.id),
                    {
                        ...state.employees[action.id],
                        skills: action.skills,
                    },
                    ...state.employees.slice(action.id + 1),
                ],
            };

        case types.UPDATE_FIELD:
            return {
                ...state,
                employees: [
                    ...state.employees.slice(0, action.id),
                    {
                        ...state.employees[action.id],
                        [action.column]: action.text,
                    },
                    ...state.employees.slice(action.id + 1),
                ],
            };

        case types.UPDATE_SKILLS:
            return {
                ...state,
                skills: {
                    ...action.skills,
                }
            };

        case types.UPDATE_SKILL:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    skill: action.skill,
                },
            };

        case types.UPDATE_FIRST_NAME:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    firstname: action.firstname,
                },
            };

        case types.UPDATE_LAST_NAME:
            return {
                ...state,
                userInput: {
                    ...state.userInput,
                    lastname: action.lastname,
                },
            };

        default:
            return state;
    }
};

export default reducer;