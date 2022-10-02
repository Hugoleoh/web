import { createStore } from "vuex";

import usersModule from "./modules/users/index.js";
import pollsModule from "./modules/polls/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    users: usersModule,
    polls: pollsModule,
    auth: authModule,
  },
});

export default store;
