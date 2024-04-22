"use client";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { dataProvider } from "ra-data-simple-prisma";

const AdminApp = () => (
  <Admin dataProvider={dataProvider("/api/admin")}>
    <Resource
      name="listings"
      list={ListGuesser}
      edit={EditGuesser}
      //   recordRepresentation="name"
    />
    <Resource name="reservations" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default AdminApp;
