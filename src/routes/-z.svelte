<script>
  import { error } from "@sveltejs/kit";
  import { AlertTriangle, Home } from "lucide-svelte";
</script>

<div
  class="flex flex-col items-center min-h-screen bg-gray-50 text-gray-900 py-6"
>
  <div class="max-w-md text-center">
    <!-- Modern Icon -->
    <div class="flex justify-center mb-6">
      <AlertTriangle class="w-20 h-20 text-red-500 animate-pulse" />
    </div>

    <h1 class="text-6xl font-bold text-gray-800">Oops!</h1>
    <p class="mt-4 text-lg text-gray-600">
      Something went wrong. Try again later.
    </p>

    <!-- Back Home Button -->
    <a
      href="/"
      class="mt-6 inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-zinc-600 rounded-lg hover:bg-blue-700 transition"
    >
      <Home class="w-5 h-5 " />
      Home
    </a>
  </div>
</div>
