<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import "../app.css";
  import Navbar from "../lib/components/Navbar.svelte";
  import { page } from "$app/stores";
 

  //import stores 
  
   import { session as _sessionStore, user as _userStore } from "$lib/stores/authStore";


  // cart
  import CartModal from "$lib/components/CartModal.svelte";

  let { data, children } = $props();
  let { session, supabase , user } = $derived(data);

 


  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
     if (event === 'SIGNED_IN') {
        _sessionStore.set(session ?? null)
        _userStore.set(user ?? null)
        
      } else if (event === 'SIGNED_OUT') {
        _sessionStore.set(null)
        _userStore.set(null)
        
      }else if(event === 'INITIAL_SESSION'){
        if(_userStore){
          
        } _userStore.set(user ?? null)
        console.log(event)
      }
     
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="min-h-screen bg-gradient-to-b bg-zinc-200">
  <Navbar {data} />
  {@render children()}
  <CartModal />
</div>
