interface Route {
    NAME: string;
    PATH: string;
}

export const NEWS_ROUTE: Route = {
    NAME: "news",
    PATH: "/",
};
export const LOGIN_ROUTE: Route = {
    NAME: "login",
    PATH: "/login",
};
export const REGISTRATION_ROUTE: Route = {
    NAME: "registration",
    PATH: "/registration",
};