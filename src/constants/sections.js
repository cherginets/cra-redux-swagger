import Helper from "../common/Helper";

export const sections = [
    {code: "home", name: "Home", title: "Home page", path: "/"},
    {code: "forms", name: "Forms", title: "forms page", path: "/forms"},
    {code: "tables", name: "Tables", title: "Tables examples", path: "/tables"},
    {code: "samples", name: "Samples", title: "Samples page", path: "/samples"},
];
export const sections_map = Helper.create_map(sections, 'code');
export const sections_get = (code) => sections[sections_map[code]];