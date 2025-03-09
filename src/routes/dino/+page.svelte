<script lang="ts">
  import { Label, Button } from "flowbite-svelte";
  import { db } from "$lib/database/database";
  import { user } from "$lib/database/schema/schema";

  function insertUser(userData: {
    id: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
  }) {
    try {
      db.insert(user).values({
        id: userData.id,
        email: userData.email,
        password: userData.password,
        address: userData.address || "",
        phone: userData.phone || "",
      });
      console.log("User inserted successfully");
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }

  function HandleButton() {
    insertUser({
      id: "unique-user-id",
      email: "john.doe@example.com",
      password: "securepassword",
      address: "123 Main St",
      phone: "123-456-7890",
    });
  }
</script>

<div class="flex flex-col items-center justify-center py-5 gap-y-2">
  <Button
    outline
    onclick={HandleButton}
    class="bg-zinc-700 shadow-lg drop-shadow-lg font-roboto uppercase px-10"
    >Test</Button
  >
  <h1 class="font-roboto font-bold">current Data</h1>
  <h2 class="font-rubik font-normal text-2xl text-zinc-600">
    lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum
  </h2>
</div>
