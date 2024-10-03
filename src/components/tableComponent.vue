<template>
  <div class="table-container">
    <div class="table__btn">
      <button class="table__btn-create" @click="openModalCreate">создать</button>
    </div>
    <div class="table__filter">
      <v-text-field
          hide-details="auto"
          v-model="search.request"
          append-icon="mdi-magnify"
          @keyup.enter="searchMethod"
          hide-spin-buttons
          placeholder="Поиск (№ заявки, название)"
      ></v-text-field>
      <v-autocomplete
          :items="getHomes"
          v-model="search.premise_id"
          item-value="id"
          item-text="full_address"
          placeholder="Дом"
          hide-details
      />
    </div>
    <v-row>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="tableData"
            :loading="loading"
            loading-text="Данные загружаются"
            item-key="id"
            density="compact"
            :items-per-page="itemsPerPage"
            class="mt-4 table-body"
        >
          <template v-slot:[`item.number`]="{ item }">
            <div class="table-item">
              <span @click="selectRequest(item)" class="table-body__number">{{ item?.number }}</span>
            </div>
          </template>
          <template v-slot:[`item.address`]="{ item }">
            <div class="table-item">
              <p>{{item?.premise?.address}} {{item?.apartment?.label}}</p>
            </div>
          </template>
          <template v-slot:[`item.applicant`]="{ item }">
            <div class="table-item">
              <p>{{item?.applicant?.last_name}} {{item?.applicant?.first_name}}</p>
            </div>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <div class="table-item">
              <p>{{item?.status?.name}}</p>
            </div>
          </template>
        </v-data-table>
        <modalComponent
            :isOpen="isModalOpen"
            @closeModal="closeModal"
            :dataRequest="dataRequest"
            :isCreate="isCreate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import modalComponent from "@/components/modalComponent.vue";
import getHome from "@/mixins/getHome";
export default {
  props: {
    tableData: {
      type: Array,
    },
    homeData: {
      type: Array,
    },
  },
  components: {
    modalComponent
  },
  mixins: [getHome],
  data() {
    return {
      itemsPerPage: 10,
      headers: [
        { text: '№', value: 'number', class: 'table-header', sortable: true },
        { text: 'Создана', value: 'created_at', class: 'table-header', sortable: true },
        { text: 'Адресс', value: 'address', class: 'table-header', sortable: false },
        { text: 'Заявитель', value: 'applicant', class: 'table-header', sortable: false },
        { text: 'Описание', value: 'description', class: 'table-header', sortable: false },
        { text: 'Срок', value: 'due_date', class: 'table-header', sortable: true },
        { text: 'Статус', value: 'status', class: 'table-header', sortable: true },
      ],
      search:{
        premise_id: '',
        request: ''
      },
      premise: [],
      isModalOpen: false,
      dataRequest: null,
      isCreate: true,
    };
  },
  computed: {
    loading(){
      return !this.tableData?.length
    },
  },
  methods: {
    searchMethod(){
      console.log('search')
    },
    openModal() {
      this.isCreate = false
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    openModalCreate() {
      this.isCreate = true
      this.isModalOpen = true
      this.dataRequest = {}
    },
    selectRequest(data){
      this.dataRequest = {
        id: data.id,
        number: data?.number,
        created_at: data?.created_at,
        premiseId: data?.premise?.id,
        status: data?.status?.name,
        premiseFlat: data?.apartment?.id,
        dueDate: data?.due_date,
        lastName: data?.applicant?.last_name,
        firstName: data?.applicant?.first_name,
        patronymicName: data?.applicant?.patronymic_name,
        phone: data?.premise?.locality?.phone_code1 ?? '' + ' ' + data?.premise?.locality?.phone_code2 ?? '',
        description: data?.description,
      }
      this.openModal()
    }
  }
};
</script>


<style scoped lang="scss">
@import '../assets/variables.css';
.cursor-pointer:hover {
  background-color: #edf2f7;
}
.table {
  &-container{
    width: calc(100% - 40px);
    margin-left: 20px;
  }

  &__btn {
    display: flex;
    justify-content: end;
    &-create {
      background-color: var(--primary-color);
      padding: 8px 16px;
      border-radius: 4px;
      color: #fff;
    }
  }

  &__filter{
    display: flex;
    gap: 15px;
  }

  &-head {
    th{
      color: var(--primary-color);
    }
  }

  &-body {
    td{
      padding: 15px 40px 15px 4px;
      border: 1px solid #DDDFE0;
    }
    &__number {
      background-color: var(--primary-color);
      padding: 8px 16px;
      border-radius: 4px;
      color: #fff;
    }
  }
}
</style>