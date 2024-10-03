<template>
  <v-dialog :value="isOpen" @input="closeModal" max-width="800px">
    <v-card class="modal">
      <div class="modal__title">
        <span class="modal__title-text">{{ isCreate ? 'Создание заявки' : `Заявка № ${newRequest?.number} (${newRequest?.created_at})` }}</span>
        <span class="modal__title-status">{{ isCreate ? 'Новая' : `${newRequest?.status}` }}</span>
      </div>
      <v-card-text class="modal__text">
        <v-row class="d-flex mb-3" style="gap:10px; width: 100%;">
          <v-autocomplete
              :items="getHomes"
              v-model="newRequest.premiseId"
              item-value="id"
              item-text="full_address"
              placeholder="Дом"
              hide-details
          />
          <v-autocomplete
              :items="getFlats"
              v-model="newRequest.premiseFlat"
              item-value="id"
              item-text="label"
              placeholder="Квартира"
              hide-details
              :disabled="!getFlats?.length"
          />
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="newRequest.dueDate"
                  label="Срок"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newRequest.dueDate" @input="menu=false"></v-date-picker>
          </v-menu>
        </v-row>
        <v-row class="d-flex" style="gap:10px; width: 100%">
          <v-text-field
              label="Фамилия"
              v-model="newRequest.lastName"
              @input="performSearch"
          ></v-text-field>
          <v-text-field
              label="Имя"
              v-model="newRequest.firstName"
              @input="performSearch"
          ></v-text-field>
          <v-text-field
              label="Отчество"
              v-model="newRequest.patronymicName"
              @input="performSearch"
          ></v-text-field>
          <v-text-field
              label="Телефон"
              v-model="newRequest.phone"
              @input="performSearch"
          ></v-text-field>
        </v-row>
        <v-text-field
            label="Описание заявки"
            v-model="newRequest.description"
            @input="performSearch"
            class="modal__field-description"
        ></v-text-field>
      </v-card-text>
      <div class="modal__btn">
        <button v-if="isCreate" class="modal__btn-create" @click="createRequest">Создать</button>
        <button v-else class="modal__btn-create" @click="saveRequest">Сохранить</button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import getHomes from "../mixins/getHome";
export default {
  name: "modalComponent",
  props: {
    isOpen: {
      type: Boolean,
    },
    dataRequest: {
      type: (Object || null),
    },
    isCreate: {
      type: Boolean,
    },
  },
  data() {
    return {
      newRequest: {
        premiseId: '',
        premiseFlat: '',
        dueDate: '',
        lastName: '',
        firstName: '',
        patronymicName: '',
        phone: '',
        description: '',
      },
      searchTerm: '',
      search: {
        premiseId: {}
      },
      premise: [],
      flats: [],
      menu: false,
    }
  },
  mixins: [getHomes],
  computed: {
    getDataToSend(){
      return {
        id: this.newRequest.id,
        premise_id: this.newRequest.premiseId,
        apartment_id: this.newRequest.premiseFlat,
        applicant: {
          last_name: this.newRequest.lastName,
          first_name: this.newRequest.firstName,
          patronymic_name: this.newRequest.patronymicName,
        },
        username: this.newRequest.phone,
        description: this.newRequest.description,
        due_date: this.newRequest.dueDate,
      }
    }
  },
  methods: {
    performSearch(){
    },
    closeModal(){
      this.$emit('closeModal')
    },
    createRequest(){
      this.$store.dispatch('request/createRequest', this.getDataToSend)
      this.closeModal()
    },
    saveRequest(){
      this.$store.dispatch('request/saveRequest', this.getDataToSend)
      this.closeModal()
    },
  },
  watch: {
    dataRequest(newVal){
      if(newVal) this.newRequest = newVal
    },
    'newRequest.premiseId': {
      handler: function (newVal, oldVal) {
        if(newVal && newVal !== oldVal) {
          this.setHome(newVal)
        }
      },
      deep: true
    },
  }
}
</script>

<style lang="scss">
@import "../assets/variables.css";
.modal{
  padding: 10px;

  &__title{
    display: flex;
    justify-content: space-between;
    padding: 20px;

    &-text{
      font-weight: 500;
      font-size: 16px;
    }
    &-status{
      font-weight: 400;
      font-size: 14px;
    }
  }

  &__text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px !important;
  }

  &__field{
    &-description{
      width: 100%;

      .v-input__control{
        min-height: 130px;

        .v-input__slot{
          align-items: start !important;
        }
      }
    }
  }
  &__btn {
    display: flex;
    justify-content: end;
    padding: 0 24px 15px;

    &-create {
      background-color: var(--primary-color);
      padding: 8px 16px;
      border-radius: 4px;
      color: #fff;
    }
  }
}
</style>