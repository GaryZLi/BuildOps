import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';

import ActionButton from './ActionButton';
import {
    hashCode,
    updateSkills,
    updateSkill,
    updateEmployeeSkills,
} from '../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textListContainer: {
        position: 'relative',
    },
    list: {
        width: '100%',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 5,
    },
    textField: {
        marginLeft: 10,
        minWidth: 150,
    },
    nested: {
        overflow: 'hidden',
    },
    buttonsContainer: {
        display: 'flex',
    },
    expandButton: {
        margin: 'auto 0',
    },
    button: {
        display: 'inline-block',
        padding: '5px 10px',
        borderRadius: '0.15em',
        boxSizing: 'border-box',
        textDecoration: 'none',
        fontFamily: 'Roboto, sans-serif',
        textTransform: 'uppercase',
        fontWeight: 400,
        color: '#FFFFFF',
        boxShadow: 'inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)',
        textAlign: 'center',
        position: 'relative',
        '&:active': {
            top: '0.1em',
        }
    },
    addSkillButton: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'gray',
    },
}));

const SkillListMenu = ({
    skills,
    employeeSkills,
    info,
    setEdited,
    updateSkill,
    updateSkills,
    updateEmployeeSkills,
}) => {
    const classes = useStyles();
    const [skill, setSkill] = useState('');
    const [open, setOpen] = useState(false);
    let name;

    const handleClick = () => setOpen(!open);

    const handleActionButtonClick = () => {
        // // only add the skill if the user has entered at least 1 char
        if (skill.length) {
            if (employeeSkills) {
                if (name === 'Add Skill') {
                    // append our skill, with a hashed ID
                    updateEmployeeSkills(
                        [
                            ...employeeSkills,
                            {
                                name: skill,
                                id: hashCode(skill),
                            },
                        ], 
                        info.id,
                    );
                }
                else {
                    // filter the current active skill
                    updateEmployeeSkills(
                        [
                            ...employeeSkills.filter(es => es.name !== skill),
                        ], 
                        info.id,
                    );
                }

                // let us know the user has made a change
                if (setEdited) setEdited(true)
            }
            else {
                let tempSkills = {...skills};

                if (name === 'Add Skill') {
                    // get a hashed ID for our skill
                    tempSkills[skill] = hashCode(skill);
                    // adds this added skill to our current list of skills in the redux state
                    updateSkills(tempSkills);
                }
                else {
                    delete tempSkills[skill];
                    updateSkills({...tempSkills});
                }
            }

            // reset the skill input value
            setSkill('');
        }
    };

    // conditional render a different button depending on actions
    const getName = () => {
        if (employeeSkills) {
            if (!employeeSkills.find(es => es.name === skill)) {
                return 'Add Skill';
            }

            return 'Delete Skill';
        }
        else {
            if (!skill.length || !skills[skill]) {
                return 'Add Skill';
            }

            return 'Delete Skill';
        }
    };

    name = getName();

    return (
        <div className={classes.root}>
            <div className={classes.textListContainer}>
                <TextField
                    placeholder='Type Skill Here'
                    className={classes.textField} 
                    value={skill} 
                    onChange={e => setSkill(e.target.value)} 
                />
                <Collapse
                    className={classes.list}
                    in={open}
                    timeout="auto"
                    unmountOnExit
                >
                    <Paper component="div" >
                        {/* Run this block if it's the employee datatable section */}
                        {employeeSkills && employeeSkills.map(skill =>
                            (
                                <ListItem button key={skill.name} className={classes.nested}>
                                    <ListItemText 
                                        primary={skill.name} 
                                        onClick={() => setSkill(skill.name)}
                                    />
                                </ListItem>
                            )
                        )}
                        {/* Run this block if it's the adding employee field section */}
                        {!employeeSkills && Object.keys(skills).map(skill =>
                            (
                                <ListItem button key={skill} className={classes.nested}>
                                    <ListItemText
                                        primary={skill} 
                                        onClick={() => setSkill(skill)}
                                    />
                                </ListItem>
                            )
                        )}
                    </Paper>
                </Collapse>
            </div>
            <div className={classes.buttonsContainer}>
                {/* change the icons when user open/close the list */}
                {open
                    ? (
                        <ExpandLess
                            className={classes.expandButton}
                            onClick={handleClick}
                        />
                    )
                    : (
                        <ExpandMore
                            className={classes.expandButton}
                            onClick={handleClick}
                        />
                    )
                }
                <ActionButton
                    className={[classes.button, classes.addSkillButton].join(' ')}
                    name={name}
                    style={{
                        backgroundColor: 
                            name === 'Delete Skill'
                            ? 'red'
                            : skill.length
                            ? '#3369ff'
                            : 'gray',
                    }}
                    onClick={handleActionButtonClick}
                />
            </div>
        </div>
    );
}

const mapStateToProps = ({ skills }) => ({ skills });

const mapDispatchToProps = {
    updateSkills,
    updateSkill,
    updateEmployeeSkills,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillListMenu);