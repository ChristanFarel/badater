<template>
  <div class="container">
    <h1>Badater Cassandra</h1>

    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="NIM"
          aria-label="NIM"
          v-model="nim"
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="Nama"
          aria-label="Nama"
          v-model="nama"
        />
      </div>
      <div class="col-1">
        <button class="btn btn-primary" @click="addMahasiswa">submit</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>NIM</th>
          <th>NAMA</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="data in data_mahasiswa" :key="data.nim">
        <tr>
          <td>{{ data.nim }}</td>
          <td>{{ data.nama }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteMahasiswa(data.nim)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_mahasiswa: [],
      nim: "",
      nama: "",
    };
  },
  beforeMount() {
    this.axios.get("http://127.0.0.1:3000/all-mahasiswa").then((res) => {
      this.data_mahasiswa = res.data.rows;
    });
  },
  methods: {
    addMahasiswa: function () {
      if (this.nim.length > 0 && this.nama.length > 0) {
        this.axios
          .post("http://127.0.0.1:3000/add-mahasiswa", {
            nim: this.nim,
            nama: this.nama,
          })
          .then((res) => {
            console.log(res);
            this.getAllMahasiswa();
          });
      }
    },
    getAllMahasiswa: function () {
      this.axios.get("http://127.0.0.1:3000/all-mahasiswa").then((res) => {
        this.data_mahasiswa = res.data.rows;
      });
    },
    deleteMahasiswa: function (nim) {
      console.log(nim);
      this.axios
        .delete(`http://127.0.0.1:3000/del-mahasiswa/${nim}`)
        .then((res) => {
          console.log(res);
          this.getAllMahasiswa();
        });
    },
  },
};
</script>

<style>
</style>
