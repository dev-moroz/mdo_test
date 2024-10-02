<template>
  <v-container>
    <v-row>
      <v-col>
<!--        <h1 class="text-h5">Sorted Data Table</h1>-->

        <!-- Loader -->
        <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
            class="mx-auto"
        ></v-progress-circular>

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
<!--              <p>{{item.number}}</p>-->
              <span class="table-body__number">{{ item?.number }}</span>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    }
  },
  data() {
    return {
      // loading: false,
      itemsPerPage: 10,
      headers: [
        { text: '№', value: 'number', sortable: true },
        { text: 'Создана', value: 'created_at', sortable: true },
        { text: 'Адресс', value: 'address', sortable: false },
        { text: 'Заявитель', value: 'applicant', sortable: false },
        { text: 'Описание', value: 'description', sortable: false },
        { text: 'Срок', value: 'due_date', sortable: true },
        { text: 'Статус', value: 'status', sortable: true },
      ],
    };
  },
  computed: {
    loading(){
      return !this.tableData?.length
    }
  }
};
</script>


<style scoped lang="scss">
.cursor-pointer:hover {
  background-color: #edf2f7; /* Серая подсветка при наведении */
}
.table {
  &-head {
    th{
      color: #50B053;
    }
  }
  &-body {
    td{
      padding: 15px 40px 15px 4px;
      border: 1px solid #DDDFE0;
    }
    &__number {
      background-color: #50B053;
      padding: 12px 16px;
      border-radius: 4px;
      color: #fff;
    }
  }
}
//.loader {
//  border: 4px solid rgba(0, 0, 0, 0.1);
//  border-top: 4px solid #3490dc; /* Цвет вашего лоадера */
//  border-radius: 50%;
//  width: 40px;
//  height: 40px;
//  animation: spin 1s linear infinite;

//  position: absolute;
//  top: 50%;
//  right: 50%;
//}

//@keyframes spin {
//  0% {
//    transform: rotate(0deg);
//  }
//  100% {
//    transform: rotate(360deg);
//  }
//}
</style>