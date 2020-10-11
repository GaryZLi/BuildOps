import * as types from './action-types';

export const hashCode = skill => {
    let hash = 0;

    if (skill.length === 0) return hash;

    for (let i = 0; i < skill.length; i++) {
        let char = skill.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // Convert to 32bit integer
    }

    return hash;
};

export const getUniqueId = (firstname, lastname, length) => `${firstname}-${lastname}-${new Date().getTime()}-${length}`;

export const updateEmployees = employees => ({
    type: types.UPDATE_EMPLOYEES,
    employees,
});

export const updateEmployeeSkills = (skills, id) => ({
    type: types.UPDATE_EMPLOYEE_SKILLS,
    skills,
    id,
});

export const updateSkill = skill => ({
    type: types.UPDATE_SKILL,
    skill,
});

export const updateSkills = skills => ({
    type: types.UPDATE_SKILLS,
    skills,
});

export const updateFirstName = firstname => ({
    type: types.UPDATE_FIRST_NAME,
    firstname,
});

export const updateLastName = lastname => ({
    type: types.UPDATE_LAST_NAME,
    lastname,
});

export const updateField = (text, id, column) => ({
    type: types.UPDATE_FIELD,
    text,
    id,
    column,
});