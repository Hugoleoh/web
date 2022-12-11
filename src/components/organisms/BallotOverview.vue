<template>
  <v-container>
    <v-row
      class="full-height-has-navbar justify-center"
      :class="[{ 'align-content-center': !hasQuestions }]"
      no-gutters
    >
      <v-col cols="12" class="question-card">
        <div v-if="hasQuestions">
          <v-row class="center-content">
            <v-col cols="12">
              <v-btn
                class="grow-animation grow-on-hover mt-4"
                color="success"
                elevation="2"
                large
              >
                <v-icon left dark>mdi-plus-box</v-icon>
                Nova Questão
                <form-modal @clickSave="createNewQuestion">
                  <template v-slot:card-title>
                    <span class="text-white">Nova Questão</span>
                    <v-divider></v-divider>
                  </template>

                  <template v-slot:card-text>
                    <new-question
                      @changeForm="updateQuestionModel"
                    ></new-question>
                  </template>
                </form-modal>
              </v-btn>
            </v-col>
          </v-row>
          <v-card
            elevation="2"
            class="mb-5 mt-5"
            light
            tag="section"
            v-for="(question, i) in pollQuestions"
            :key="i"
          >
            <v-toolbar class="nav-bar">
              <v-toolbar-title
                ><v-layout align-center justify-space-between>
                  <h3 class="text-white">{{ question.name }}</h3>
                </v-layout>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon>
                    <v-icon color="white">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item class="clickable">
                    <v-list-item-title
                      ><v-icon class="mr-1"> {{ editItem.icon }} </v-icon
                      >{{ editItem.title }}</v-list-item-title
                    >
                    <form-modal @clickSave="saveQuestion">
                      <template v-slot:card-title>
                        <span class="text-white">Editar Questão</span>
                        <v-divider></v-divider>
                      </template>

                      <template v-slot:card-text>
                        <new-question
                          :questionToEdit="question"
                          :method="editItem.action"
                          @changeForm="updateQuestionModel"
                        ></new-question>
                      </template>
                    </form-modal>
                  </v-list-item>
                  <v-list-item class="clickable">
                    <v-list-item-title
                      ><v-icon class="mr-1"> {{ deleteItem.icon }} </v-icon
                      >{{ deleteItem.title }}</v-list-item-title
                    >
                    <confirm-modal
                      @clickConfirm="deleteSelectedQuestion(question.id)"
                    >
                      <template v-slot:card-title>
                        <span class="text-white">Excluir Questão</span>
                        <v-divider></v-divider>
                      </template>
                      <template v-slot:card-text>
                        <p>Realmente deseja excluir esta questão?</p>
                        <h3>Esta ação não pode ser desfeita.</h3>
                      </template>
                    </confirm-modal>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- <template v-slot:extension>
                <v-tabs center-active v-model="model">
                  <v-tab class="text-white" :value="i + '-options'"
                    >Opções</v-tab
                  >
                  <v-tab class="text-white" :value="i + '-details'"
                    >Detalhes</v-tab
                  >
                </v-tabs>
              </template> -->
            </v-toolbar>
            <!-- <v-window v-model="model">
              <v-window-item>
                <v-card>
                  <v-card-text>{{ i }}</v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item>
                <v-card>
                  <v-card-text>{{ i + 1 }}</v-card-text>
                </v-card>
              </v-window-item>
            </v-window> -->
            <v-card-text>
              <p>{{ question.description }}</p>
              <v-divider></v-divider>
              <v-card
                v-for="option in question.options"
                :key="option.id"
                class="mt-1"
              >
                <v-toolbar>
                  <v-toolbar-title
                    ><v-layout align-center justify-space-between>
                      <span class="option-text"
                        ><v-icon class="mr-2">mdi-checkbox-marked-circle</v-icon
                        >{{ option.name }}</span
                      >
                    </v-layout>
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-menu location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item class="clickable">
                        <v-list-item-title
                          ><v-icon class="mr-1"> {{ editItem.icon }} </v-icon
                          >{{ editItem.title }}</v-list-item-title
                        >
                        <form-modal @clickSave="saveOption">
                          <template v-slot:card-title>
                            <span class="text-white">Editar Opção</span>
                            <v-divider></v-divider>
                          </template>

                          <template v-slot:card-text>
                            <new-option
                              :optionToEdit="option"
                              :question="question"
                              :method="editItem.action"
                              @changeForm="updateOptionModel"
                            ></new-option>
                          </template>
                        </form-modal>
                      </v-list-item>
                      <v-list-item class="clickable">
                        <v-list-item-title
                          ><v-icon class="mr-1"> {{ deleteItem.icon }} </v-icon
                          >{{ deleteItem.title }}</v-list-item-title
                        >
                        <confirm-modal
                          @clickConfirm="deleteSelectedOption(option.id)"
                        >
                          <template v-slot:card-title>
                            <span class="text-white">Excluir Opção</span>
                            <v-divider></v-divider>
                          </template>
                          <template v-slot:card-text>
                            <p>Realmente deseja excluir esta opção?</p>
                            <h3>Esta ação não pode ser desfeita.</h3>
                          </template>
                        </confirm-modal>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="2"
                color="success"
                variant="flat"
                class="grow-animation grow-on-hover"
              >
                <v-icon left dark>mdi-plus-box</v-icon>
                Adicionar opção
                <form-modal @clickSave="createNewOption">
                  <template v-slot:card-title>
                    <span class="text-white">Nova Opção</span>
                    <v-divider></v-divider>
                  </template>

                  <template v-slot:card-text>
                    <new-option
                      :question="question"
                      @changeForm="updateOptionModel"
                    ></new-option>
                  </template>
                </form-modal>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="welcome-notice" v-else>
          <h1 class="welcome-title">Construa sua cédula de votação</h1>
          <h2 class="welcome-subtitle">
            Vamos começar criando sua primeira questão
          </h2>
          <v-btn
            class="new-poll grow-animation grow-on-hover mt-4"
            color="success"
            elevation="2"
            x-large
          >
            <v-icon left dark>mdi-plus-box</v-icon>
            Nova Questão
            <form-modal @clickSave="createNewQuestion">
              <template v-slot:card-title>
                <span class="text-white">Nova Questão</span>
                <v-divider></v-divider>
              </template>

              <template v-slot:card-text>
                <new-question @changeForm="updateQuestionModel"></new-question>
              </template>
            </form-modal>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import QuestionHelperVue from "@/mixins/QuestionHelper.vue";
import OptionHelperVue from "@/mixins/OptionHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
import FormModal from "@/components/atoms/FormModal.vue";
import ConfirmModal from "@/components/atoms/ConfirmModal.vue";
import NewQuestion from "@/components/molecules/NewQuestion.vue";
import NewOption from "@/components/molecules/NewOption.vue";
export default {
  name: "BallotOverview",
  mixins: [QuestionHelperVue, UserHelperVue, PollHelperVue, OptionHelperVue],
  components: {
    FormModal,
    NewQuestion,
    NewOption,
    ConfirmModal,
  },

  data() {
    return {
      dialog: false,
      question: {
        name: "",
        description: "",
        type: "",
        pollId: "",
      },
      option: {
        name: "",
        description: "",
        type: "",
        qustionId: "",
        pollId: "",
      },
      model: "",
      editItem: { title: "Editar", icon: "mdi-pencil", action: "edit" },
      deleteItem: { title: "Excluir", icon: "mdi-delete", action: "delete" },
    };
  },
  computed: {
    poll() {
      return this.selectedPoll ?? {};
    },
    pollQuestions() {
      return this.poll?.questions;
    },
    hasQuestions() {
      return this.pollQuestions?.length > 0 ? true : false;
    },
  },
  methods: {
    async createNewQuestion() {
      this.isLoading = true;
      try {
        this.question.pollId = parseInt(this.$route.params.pollId);
        await this.createQuestion(this.question);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
    },
    async createNewOption() {
      this.isLoading = true;
      try {
        this.option.pollId = parseInt(this.$route.params.pollId);
        await this.createOption(this.option);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      this.$router.go();
    },
    updateQuestionModel(newValue) {
      this.question = newValue;
    },
    updateOptionModel(newValue) {
      this.option = newValue;
    },
    async saveQuestion() {
      this.isLoading = true;
      try {
        await this.editQuestion(this.question);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
    },
    async saveOption() {
      this.isLoading = true;
      try {
        this.option.pollId = this.selectedPoll.id;
        await this.editOption(this.option);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
    },
    async deleteSelectedQuestion(questionId) {
      this.isLoading = true;
      try {
        const payload = {
          questionId: questionId,
          pollId: this.selectedPoll.id,
        };
        await this.deleteQuestion(payload);
        this.$router.go();
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
    },
    async deleteSelectedOption(optionId) {
      this.isLoading = true;
      try {
        const payload = {
          optionId: optionId,
          pollId: this.selectedPoll.id,
        };
        await this.deleteOption(payload);
        this.$router.go();
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
    },
  },
};
</script>

<style scoped>
.question-card {
  max-width: 1000px;
}
.option-text {
  font-size: 1rem;
}
.center-content {
  text-align: center;
}
.clickable {
  cursor: pointer;
}
</style>
