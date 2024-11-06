export interface Credentials {
    username: string,
    password: string
}

export interface Task {
    _id : string,
    title: string,
    completed: boolean,
    description: string,
}

export interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
   
}

export  interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export interface PrivateRouteProps {
    component: React.ReactElement; 
}