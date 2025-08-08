import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
        users: usersReducer
    }
})

export default store;