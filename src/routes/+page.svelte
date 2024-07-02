<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button";
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';

    export let data: PageData;

    const { form, errors, constraints, message, enhance } = superForm(data.form);


</script>




<div class="w-1/2 m-auto  md:w-2/3 lg:w-1/2 mt-16">
    <div>
        <img src="proformarr-owl.png" class="w-full"/>

    </div>
    <div class="w-full px-4 py-8 m-auto">
        <h1 class='font-bold text-xl'>PROFORMARR</h1>
       
        <form method="POST" use:enhance>
    
            <Input class="my-4"
                type="text"
                name="name"
                aria-invalid={$errors.name ? 'true' : undefined}
                bind:value={$form.name}
                {...$constraints.name}
            />
            {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

         
            <!-- {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if} -->

            <div class='p-2 w-32 text-center bg-amber-200'><button>Submit</button></div>

        </form>
        

            {#if $message}
            <div class='p-4 bg-yellow-100'>
                {@html $message.content[0].text}
            </div>
            {/if}
    
         
        
      
 
    </div>
    



</div>

<style>
    .invalid {
        color: red;
    }
</style>
