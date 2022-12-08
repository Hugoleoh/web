import { createStore } from "vuex";

import usersModule from "./modules/users/index.js";
import pollsModule from "./modules/polls/index.js";
import questionsModule from "./modules/questions/index.js";
import optionsModule from "./modules/options/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    users: usersModule,
    polls: pollsModule,
    questions: questionsModule,
    options: optionsModule,
    auth: authModule,
  },
});

export default store;
