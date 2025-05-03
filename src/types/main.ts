/**
 * 習熟レベル.
 * 
 * levelは...
 * 1. 勉強中 or 使ったことがある程度.
 * 2. LLMかdocをめっちゃ使いながらなら使える.
 * 3. 基本文法はさらっと書ける.
 * 4. 必要に応じて調べながら使える.
 * 5. 自信max.
 */
type Level = 1 | 2 | 3 | 4 | 5;

type ModuleProficiency = {
    name: string;
    level: Level; // 1-5
}

type ProgrammingLanguageProficiency = {
    name: string;
    icon_uri: string;
    level: Level; // 1-5
    modules: ModuleProficiency[];
}

type TechStack = {
    programingLanguages: ProgrammingLanguageProficiency[];
}

export type { ModuleProficiency, ProgrammingLanguageProficiency, TechStack };