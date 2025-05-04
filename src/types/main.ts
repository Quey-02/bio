

type ModuleProficiency = {
    name: string;
    icon_uri: string;
}

type FieldOfTech = {
    name: string;
    modules: ModuleProficiency[];
}

type TechStack = {
    fields: FieldOfTech[];
}

export type { ModuleProficiency, FieldOfTech as ProgrammingLanguageProficiency, TechStack };