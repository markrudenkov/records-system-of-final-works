
const passValidator = (input) => {
    if (!/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(input)) {
        return 'has to be longer than 6; spaces restricted';
    }
    return '';
};
const nameValidator = (input) => {
    if (!/^[A-Za-z0-9 ]{3,20}$/.test(input)) {
        return 'has to be longer than 3; special chars restricted';
    }
    return '';
};
const loginValidator = (input) => {
    if (!/^[A-Za-z0-9_]{1,20}$/.test(input)) {
        return 'allows only letters and numbers; spaces restricted';
    }
    return '';
};
const textValidator = (input) => {
    if (!/^[A-Za-z0-9.,!@#$%^&*()_ ]{3,200}$/.test(input)) {
        return 'has to be longer than 3; spaces restricted';
    }
    return '';
};
const idValidator = (input) => {
    if (!/^[0-9]{1,20}$/.test(input)) {
        return 'has to be longer than 3; only numbers allowed!';
    }
    return '';
};

const studentListFormData = [{
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Name',
            ref: 'name'
        },
        label: 'Name',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Surname',
            ref: 'surname'
        },
        label: 'Surname',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Username',
            ref: 'username'
        },
        label: 'Username',
        validate: loginValidator
}];

const academicListFormData = studentListFormData.concat([{
    type: 'input',
    props: {
        type: 'text',
        placeholder: 'Enter Academic Title',
        ref: 'title'
    },
    label: 'Academic Title',
    validate: textValidator
}]);

const studentFormData = [{
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Student Id',
            ref: 'id'
        },
        label: 'Student Id',
        validate: idValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Name',
            ref: 'name'
        },
        label: 'Name',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Surname',
            ref: 'surname'
        },
        label: 'Surname',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Username',
            ref: 'username'
        },
        label: 'Username',
        validate: loginValidator
    },
    {
        type: 'input',
        props: {
            type: 'password',
            placeholder: 'Enter Password',
            ref: 'password'
        },
        label: 'Password',
        validate: passValidator
}];

const academicFormData = [{
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Name',
            ref: 'name'
        },
        label: 'Name',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Surname',
            ref: 'surname'
        },
        label: 'Surname',
        validate: nameValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Username',
            ref: 'username'
        },
        label: 'Username',
        validate: loginValidator
    },
    {
        type: 'input',
        props: {
            type: 'password',
            placeholder: 'Enter Password',
            ref: 'password'
        },
        label: 'Password',
        validate: passValidator
    },
    {
        type: 'input',
        props: {
            type: 'text',
            placeholder: 'Enter Academic Title',
            ref: 'title'
        },
        label: 'Academic Title',
        validate: textValidator
}];

const studentForm = {
    formData: studentFormData,
    legend: 'Register new student',
    buttonLabel: 'Register student'
};
const academicForm = {
    formData: academicFormData,
    legend: 'Register new academic',
    buttonLabel: 'Register academic'
};

const initialState = {
    passValidator: passValidator,
    textValidator: textValidator,
    nameValidator: nameValidator,
    loginValidator: loginValidator,
    academicForm: academicForm,
    studentForm: studentForm,
    studentListFormData: studentListFormData,
    academicListFormData: academicListFormData
};

function formReducer(state=initialState, action) {
    return state;
}

module.exports = formReducer;