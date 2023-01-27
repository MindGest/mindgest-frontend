<script>
  import Button from "$lib/components/Button.svelte";
    import TextBox from "$lib/components/TextBox.svelte";
    let email = "";
    let password = "";
    let confirm = "";

    async function recoverPassword(email) {
        alert(`${email}`)
        //TODO: Integrate
    }
</script>


<div class="block justify-items-center text-center m-10">
    <h1 class="text-4xl font-bold m-10">Recuperar Password</h1>
    <form on:submit|preventDefault={async () => await recoverPassword(email) }>
        <TextBox class="w-1/3 my-5 m-auto" label="email" bind:value={email} />
        <Button class="w-1/3 my-20 m-auto" text="submit" type="submit" />
    </form>
</div>
